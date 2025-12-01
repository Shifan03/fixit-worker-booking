import jwt from "jsonwebtoken";
import bookingModel from "../models/bookingModel.js";
import workerModel from "../models/workerModel.js";
import customerModel from "../models/customerModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // Required to check file existence

// Admin Login API
const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

};

// Get all bookings
const bookingsAdmin = async (req, res) => {
    try {

        const bookings = await bookingModel.find({})
        res.json({ success: true, bookings })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

};

// Cancel a booking
const bookingCancel = async (req, res) => {
    try {

        const { bookingId } = req.body
        await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true })

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

};

// Add a worker
const addWorker = async (req, res) => {

    try {

        const { 
		name, email, password, category, skills, 
		experience, about, hourlyRate, address 
	} = req.body;

        const imageFile = req.file;

        // checking for all data to add doctor
        if (!name || !email || !password || !category || !skills || !experience || !about || !hourlyRate || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const workerData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            category,
            skills,
            experience,
            about,
            hourlyRate,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newWorker = workerModel(workerData)
        await newWorker.save()
        res.json({ success: true, message: 'Worker Added' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
};

// Get all workers
const allWorkers = async (req, res) => {
    try {

        const workers = await workerModel.find({}).select('-password')
        res.json({ success: true, workers })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
};

// Admin dashboard stats
const adminDashboard = async (req, res) => {
    try {

        const workers = await workerModel.find({})
        const customers = await customerModel.find({})
        const bookings = await bookingModel.find({})

        const dashData = {
            workers: workers.length,
	    bookings: bookings.length,
            customers: customers.length,
            latestBookings: bookings.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
};

export {
    loginAdmin,
    bookingsAdmin,
    bookingCancel,
    addWorker,
    allWorkers,
    adminDashboard
};