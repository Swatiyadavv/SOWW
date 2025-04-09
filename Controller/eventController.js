const multer = require("multer");
const EventModel = require("../Model/eventSchema");

const addEvent = async (req, res) => {
    const event = {
        eventName: req.body.eventName,
        description: req.body.description,
        eventStartDate: req.body.eventStartDate,
        eventEndDate: req.body.eventEndDate,
        location: req.body.location,
        slots: req.body.slots,
        slotPrice: req.body.slotPrice,
        eventType: req.body.eventType,
        eventPic: req.file ? req.file.filename : ""
    };

    if (event.eventPic === undefined) {
        event.eventPic = "";
    } else {
        event.eventPic =  req.file.filename;
    }

    try {
        const eventData = await new EventModel(event).save();
        res.status(201).send({ message: "Success!", data: eventData });
    } catch (error) {
        res.status(400).send({ message: "Request failed", data: "", error: error.message });
    }
};

const getAllEvents = async (req, res) => {
    try {
        const events = await EventModel.find();
        res.status(200).json({ message: "Success!", data: events });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch events", error: error.message });
    }
};
const getEventById = async (req, res) => {
    const eventId = req.params.id;

    try {
        const event = await EventModel.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Success!", data: event });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch event", error: error.message });
    }
};
const filterEvents = async (req, res) => {
    const type = req.params.type;
    const today = new Date();
    let filter = {};

    if (type === "Today") {
        const start = new Date(today.setHours(0, 0, 0, 0));
        const end = new Date(today.setHours(23, 59, 59, 999));
        filter.eventStartDate = { $gte: start, $lte: end };

    } else if (type === "Tomorrow") {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const start = new Date(tomorrow.setHours(0, 0, 0, 0));
        const end = new Date(tomorrow.setHours(23, 59, 59, 999));
        filter.eventStartDate = { $gte: start, $lte: end };

    } else if (type === "ThisWeekend") {
        const saturday = new Date();
        const sunday = new Date();
        saturday.setDate(today.getDate() + (6 - today.getDay()));
        sunday.setDate(saturday.getDate() + 1);
        const start = new Date(saturday.setHours(0, 0, 0, 0));
        const end = new Date(sunday.setHours(23, 59, 59, 999));
        filter.eventStartDate = { $gte: start, $lte: end };

    } else if (type === "Free") {
        filter.slotPrice = 0;

    } else {
        filter = {}; // All events
    }

    try {
        const events = await EventModel.find(filter);
        res.status(200).json({ message: `Filtered by ${type}`, data: events });
    } catch (error) {
        res.status(500).json({ message: "Error filtering events", error: error.message });
    }
};


module.exports = { addEvent,getAllEvents,getEventById ,filterEvents};
