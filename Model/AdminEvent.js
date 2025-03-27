

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventTitle: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    description: { type: String, required: true },
    hostedBy: { type: String, required: true },
    hostedProfileLink: { type: String, required: true },
    location: { type: String, required: true },
    eventImage: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    ticketPrice: { type: Number, default: 0 },
    capacity: { type: Number, default: 0 }
}, { timestamps: true });


const Event = mongoose.models.events || mongoose.model('events', eventSchema);

module.exports = Event;
