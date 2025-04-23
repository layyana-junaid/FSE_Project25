const mongoose = require("mongoose");

const VenueSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    availability: { 
        day: { type: Boolean, default: true },
        night: { type: Boolean, default: true }
    }
});

module.exports = mongoose.model("Venue", VenueSchema);