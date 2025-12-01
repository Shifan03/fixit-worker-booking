import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/customerModel.js";
import workerModel from "../models/workerModel.js"; // Updated model name
import bookingModel from "../models/bookingModel.js"; // Changed from appointmentModel
import { v2 as cloudinary } from 'cloudinary';
import stripe from "stripe";
import razorpay from 'razorpay';

// Gateway Initialize
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// API to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword,
        };

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get user profile data
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId).select('-password');
        res.json({ success: true, userData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to update user profile
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" });
        }

        await userModel.findByIdAndUpdate(userId, {
            name, phone, address: JSON.parse(address), dob, gender
        });

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            const imageURL = imageUpload.secure_url;
            await userModel.findByIdAndUpdate(userId, { image: imageURL });
        }

        res.json({ success: true, message: 'Profile Updated' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to book a local worker
const bookWorker = async (req, res) => {

    try {
        const { userId, workerId, slotDate, slotTime } = req.body;
        const workerData = await workerModel.findById(workerId).select("-password");

        if (!workerData.available) {
            return res.json({ success: false, message: 'Worker Not Available' });
        }

        let slots_booked = workerData.slots_booked;

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot Not Available' });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select("-password");
        
        delete workerData.slots_booked;

        const bookingData = {
            userId,
            workerId,
            userData,
            workerData,
            amount: workerData.hourlyRate,
            slotTime,       
            slotDate, 
            date: Date.now()
        };
        
        const newBooking = new bookingModel(bookingData);
        await newBooking.save();

        await workerModel.findByIdAndUpdate(workerId, { slots_booked });

        res.json({ success: true, message: 'Booking Confirmed' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to cancel a booking
const cancelBooking = async (req, res) => {
    try {
        const { userId, bookingId } = req.body;
        const bookingData = await bookingModel.findById(bookingId);

        if (bookingData.userId !== userId) {
            return res.json({ success: false, message: 'Unauthorized action' });
        }

        await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true });

        const { workerId, slotDate, slotTime } = bookingData;
        const workerData = await workerModel.findById(workerId);
        let slots_booked = workerData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
        await workerModel.findByIdAndUpdate(workerId, { slots_booked });

        res.json({ success: true, message: 'Booking Cancelled' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get user bookings
const listBookings = async (req, res) => {
    try {
        const { userId } = req.body;
        const bookings = await bookingModel.find({ userId });
        res.json({ success: true, bookings });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Payment APIs remain mostly unchanged but updated for clarity

// API to make payment using Razorpay
const paymentRazorpay = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const bookingData = await bookingModel.findById(bookingId);
        if (!bookingData || bookingData.cancelled) {
            return res.json({ success: false, message: 'Booking Cancelled or not found' });
        }

        const options = {
            amount: bookingData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: bookingId,
        };

        const order = await razorpayInstance.orders.create(options);
        res.json({ success: true, order });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to verify Razorpay payment
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if (orderInfo.status === 'paid') {
            await bookingModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            res.json({ success: true, message: "Payment Successful" });
        } else {
            res.json({ success: false, message: 'Payment Failed' });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to make payment using Stripe
const paymentStripe = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const { origin } = req.headers;
        const bookingData = await bookingModel.findById(bookingId);
        if (!bookingData || bookingData.cancelled) {
            return res.json({ success: false, message: 'Booking Cancelled or not found' });
        }

        const currency = process.env.CURRENCY.toLowerCase();
        const line_items = [{
            price_data: {
                currency,
                product_data: {
                    name: "Service Booking"
                },
                unit_amount: bookingData.amount * 100
            },
            quantity: 1
        }];

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&bookingId=${bookingData._id}`,
            cancel_url: `${origin}/verify?success=false&bookingId=${bookingData._id}`,
            line_items: line_items,
            mode: 'payment',
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Verify Stripe payment
const verifyStripe = async (req, res) => {
    try {
        const { bookingId, success } = req.body;
        if (success === "true") {
            await bookingModel.findByIdAndUpdate(bookingId, { payment: true });
            return res.json({ success: true, message: 'Payment Successful' });
        }
        res.json({ success: false, message: 'Payment Failed' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    loginUser,
    registerUser,
    getProfile,
    updateProfile,
    bookWorker,
    listBookings,
    cancelBooking,
    paymentRazorpay,
    verifyRazorpay,
    paymentStripe,
    verifyStripe
};