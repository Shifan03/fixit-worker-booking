import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    skills: { type: [String], required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
    hourlyRate: { type: Number, required: true },
    slots_booked: { type: Object, default: {} },
    address: { type: Object, required: true },
    date: { type: Date, default: Date.now }
}, { minimize: false });

const WorkerModel = mongoose.models.worker || mongoose.model("worker", workerSchema);
export default WorkerModel;