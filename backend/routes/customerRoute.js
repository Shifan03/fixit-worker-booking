import express from 'express';
import {
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
} from '../controllers/bookingController.js'; // renamed controller

import upload from '../middleware/multer.js';
import authCustomer from '../middleware/authCustomer.js'; // renamed middleware usage for clarity

const customerRouter = express.Router();

// Auth Routes
customerRouter.post("/register", registerUser);
customerRouter.post("/login", loginUser);

// Profile Routes
customerRouter.get("/get-profile", authCustomer, getProfile);
customerRouter.post("/update-profile", upload.single('image'), authCustomer, updateProfile);

// Booking Routes
customerRouter.post("/book-worker", authCustomer, bookWorker);
customerRouter.get("/bookings", authCustomer, listBookings);
customerRouter.post("/cancel-booking", authCustomer, cancelBooking);

// Payment Routes
customerRouter.post("/payment-razorpay", authCustomer, paymentRazorpay);
customerRouter.post("/verify-worker-razorpay", authCustomer, verifyRazorpay);
customerRouter.post("/payment-stripe", authCustomer, paymentStripe);
customerRouter.post("/verify-worker-stripe", authCustomer, verifyStripe);

export default customerRouter;