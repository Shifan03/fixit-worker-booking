import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

// Importing routers
import customerRouter from "./routes/customerRoute.js";
import workerRouter from "./routes/workerRoute.js";
import adminRouter from "./routes/adminRoute.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

// DB & Cloudinary setup
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use("/api/customer", customerRouter);
app.use("/api/workers", workerRouter);
app.use("/api/admin", adminRouter);

// Basic health check route
app.get("/", (req, res) => {
    res.send("API Working");
});

// Start server
app.listen(port, () => {
    console.log(`Server started on PORT:${port}`);
});