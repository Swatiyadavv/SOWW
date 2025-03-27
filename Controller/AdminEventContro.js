 const Event = require("../Model/AdminEvent");

// Create Event
// const createEvent = async (req, res) => {
//     try {
//         const {
//             eventTitle,
//             date,
//             startTime,
//             endTime,
//             description,
//             hostedBy,
//             hostedProfileLink,
//             location,
//             category,
//             tags = [],
//             ticketPrice = 0,
//             capacity = 0
//         } = req.body;

//         // Get uploaded file path
//         const eventImage = req.file ? req.file.path : null;

//         // Check if required fields are present
//         if (!eventTitle || !date || !startTime || !endTime || !description || !hostedBy || !location || !category) {
//             return res.status(400).json({ error: "All required fields must be provided" });
//         }

//         const event = new Event({
//             eventTitle,
//             date,
//             startTime,
//             endTime,
//             description,
//             hostedBy,
//             hostedProfileLink,
//             location,
//             eventImage,
//             category,
//             tags,
//             ticketPrice,
//             capacity
//         });

//         await event.save();
//         res.status(201).json({ message: "Event created successfully", event });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
const createEvent = async (req, res) => {
    try {
        const {
            eventTitle,
            date,
            startTime,
            endTime,
            description,
            hostedBy,
            hostedProfileLink,
            location,
            category,
            tags = [],
            ticketPrice = 0,
            capacity = 0
        } = req.body;

        // ✅ Save the uploaded image path
        const eventImage = req.file ? `/uploads/${req.file.filename}` : null;

        // Check if required fields are present
        if (!eventTitle || !date || !startTime || !endTime || !description || !hostedBy || !location || !category) {
            return res.status(400).json({ error: "All required fields must be provided" });
        }

        const event = new Event({
            eventTitle,
            date,
            startTime,
            endTime,
            description,
            hostedBy,
            hostedProfileLink,
            location,
            eventImage,  // ✅ Save event image path in database
            category,
            tags,
            ticketPrice,
            capacity
        });

        await event.save();
        res.status(201).json({ message: "Event created successfully", event });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get All Events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Event by ID
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Event
// const updateEvent = async (req, res) => {
//     try {
//         const updateData = req.body;

//         if (req.file) {
//             updateData.eventImage = req.file.path;
//         }

//         const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });

//         if (!updatedEvent) {
//             return res.status(404).json({ error: "Event not found" });
//         }

//         res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
const updateEvent = async (req, res) => {
    try {
        const updateData = req.body;

        // ✅ If a new image is uploaded, update the image path
        if (req.file) {
            updateData.eventImage = `/uploads/${req.file.filename}`;
        }

        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });

        if (!updatedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Delete Event
const deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
};


//http://localhost:8080/adminEvent/create