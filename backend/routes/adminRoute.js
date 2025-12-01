import express from 'express';
import {
    loginAdmin,
    bookingsAdmin,
    bookingCancel,
    addWorker,
    allWorkers,
    adminDashboard
} from '../controllers/adminController.js';

import { changeWorkerAvailability } from '../controllers/workerController.js';
import authAdmin from '../middleware/authAdmin.js';
import upload from '../middleware/multer.js';

const adminRouter = express.Router();

// Admin Auth
adminRouter.post("/login", loginAdmin);

// Worker Management
adminRouter.post("/add-worker", authAdmin, upload.single('image'), addWorker);
adminRouter.get("/all-workers", authAdmin, allWorkers);
adminRouter.post("/change-availability", authAdmin, changeWorkerAvailability);

// Booking Management
adminRouter.get("/bookings", authAdmin, bookingsAdmin);
adminRouter.post("/cancel-booking", authAdmin, bookingCancel);

// Dashboard
adminRouter.get("/dashboard", authAdmin, adminDashboard);

export default adminRouter;