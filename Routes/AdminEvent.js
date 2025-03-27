const express = require('express');
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent } = require('../Controller/AdminEventContro');
const router = express.Router();

// Routes
router.post('/', createEvent);       // Create event
router.get('/', getEvents);          // Get all events
router.get('/:id', getEventById);    // Get event by ID
router.put('/:id', updateEvent);     // Update event
router.delete('/:id', deleteEvent);  // Delete event

module.exports = router;
