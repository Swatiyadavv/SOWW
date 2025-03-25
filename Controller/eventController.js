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


module.exports = { addEvent,getAllEvents };
