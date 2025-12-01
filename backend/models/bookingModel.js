import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'customer',
        required: true
    },
    workerId: {
        type: String,
        ref: 'worker',
        required: true
    },
    slotDate: {
        type: String,
        required: true
    },
    slotTime: {
        type: String,
        required: true
    },
    userData: {
        type: Object,
        required: true
    },
    workerData: {
        type: Object,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type:  Number,
        required: true
    },
    cancelled: {
        type: Boolean,
        default: false
    },
    payment: {
        type: Boolean,
        default: false
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});

// Export model
const BookingModel = mongoose.models.booking || mongoose.model("booking", bookingSchema);

export default BookingModel;

