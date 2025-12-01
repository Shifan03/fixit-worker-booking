import express from 'express';
import {
    loginWorker,
    bookingsWorker,
    bookingCancel,
    workerList,
    changeWorkerAvailability,
    bookingComplete,
    workerDashboard,
    workerProfile,
    updateWorkerProfile
} from '../controllers/workerController.js';

import authWorker from '../middleware/authWorker.js';

const workerRouter = express.Router();

// Worker Auth
workerRouter.post("/login", loginWorker);

// Booking Management
workerRouter.post("/cancel-booking", authWorker, bookingCancel);
workerRouter.get("/bookings", authWorker, bookingsWorker);
workerRouter.post("/complete-booking", authWorker, bookingComplete);

// Worker Profile & Dashboard
workerRouter.get("/list", workerList);
workerRouter.get("/dashboard", authWorker, workerDashboard);
workerRouter.get("/profile", authWorker, workerProfile);
workerRouter.post("/update-profile", authWorker, updateWorkerProfile);
workerRouter.get("/", workerList); // This maps to /api/worker/


// Availability
workerRouter.post("/change-availability", authWorker, changeWorkerAvailability);

export default workerRouter;