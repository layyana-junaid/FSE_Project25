const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    venue: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Venue", 
        required: true 
    },
    date: { type: Date, required: true },
    timeSlot: { 
        type: String, 
        enum: ["day", "night"], 
        required: true 
    },
    paymentStatus: { 
        type: String, 
        enum: ["pending", "paid"], 
        default: "pending" 
    }
});

module.exports = mongoose.model("Booking", BookingSchema);