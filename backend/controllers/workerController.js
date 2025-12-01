import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import workerModel from "../models/workerModel.js";
import bookingModel from "../models/bookingModel.js"; 
import mongoose from 'mongoose';

// API for worker login
const loginWorker = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await workerModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            return res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

// API to get worker bookings
const bookingsWorker = async (req, res) => {
    try {
        const { workerId } = req.body;
        const bookings = await bookingModel.find({ workerId });
        res.json({ success: true, bookings });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to cancel a booking (by worker)
const bookingCancel = async (req, res) => {
    try {

        const { workerId, bookingId } = req.body

        const bookingData = await bookingModel.findById(bookingId)
        if (bookingData && bookingData.workerId === workerId) {
            await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true })
            return res.json({ success: true, message: 'Booking Cancelled' })
        }

        res.json({ success: false, message: 'Booking Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

};

// API to mark job as completed
const bookingComplete = async (req, res) => {
    try {

        const { workerId, bookingId } = req.body

        const bookingData = await bookingModel.findById(bookingId)
        if (bookingData && bookingData.workerId === workerId) {
            await bookingModel.findByIdAndUpdate(bookingId, { isCompleted: true })
            return res.json({ success: true, message: 'Booking Completed' })
        }

        res.json({ success: false, message: 'Booking Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

};

// API to fetch list of workers for frontend
const workerList = async (req, res) => {
    try {
        const workers = await workerModel.find({}).select(['-password', '-email']);
        res.json({ success: true, workers });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to change availability status of worker
const changeWorkerAvailability = async (req, res) => {
    try {

        const { workerId } = req.body

        const workerData = await workerModel.findById(workerId)
        await workerModel.findByIdAndUpdate(workerId, { available: !workerData.available })
        res.json({ success: true, message: 'Availablity Changed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
};

// API to get worker profile
const workerProfile = async (req, res) => {
    try {
        const { workerId } = req.body;
        const profileData = await workerModel.findById(workerId).select('-password');
        res.json({ success: true, profileData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to update worker profile
const updateWorkerProfile = async (req, res) => {
    try {

        const { workerId, hourlyRate, address, available } = req.body

        await workerModel.findByIdAndUpdate(workerId, { hourlyRate, address, available })

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
};

// API to get dashboard data for worker panel
const workerDashboard = async (req, res) => {
    try {

        const { workerId } = req.body

        const bookings = await bookingModel.find({ workerId })

        let earnings = 0

        bookings.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let customers = []

        bookings.map((item) => {
            if (!customers.includes(item.userId)) {
                customers.push(item.userId)
            }
        })



        const dashData = {
            earnings,
            bookings: bookings.length,
            customers: customers.length,
            latestBookings: bookings.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginWorker,
    bookingsWorker,
    bookingCancel,
    workerList,
    changeWorkerAvailability,
    bookingComplete,
    workerDashboard,
    workerProfile,
    updateWorkerProfile
};