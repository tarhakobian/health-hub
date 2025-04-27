
const express = require('express');
const Appointment = require('../models/Appointment');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const appointments = await Appointment.find({})
      .populate('doctor', 'name specialty')
      .sort({ date: 1 });
    
    // Always send an array even if no appointments are found
    res.json(appointments || []);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Get user appointments
// @route   GET /api/appointments/myappointments
// @access  Private
router.get('/myappointments', protect, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user._id })
      .populate('doctor', 'name specialty')
      .sort({ date: 1 });
    res.json(appointments || []);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { doctor, doctorName, specialty, date, time, location } = req.body;
    
    const appointment = new Appointment({
      patient: req.user._id,
      doctor,
      doctorName,
      specialty,
      date,
      time,
      location,
      status: 'upcoming',
      patientName: req.user.name
    });
    
    const createdAppointment = await appointment.save();
    res.status(201).json(createdAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private/Admin
router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    
    const appointment = await Appointment.findById(req.params.id);
    
    if (appointment) {
      appointment.status = status;
      
      const updatedAppointment = await appointment.save();
      res.json(updatedAppointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Cancel appointment
// @route   PUT /api/appointments/:id/cancel
// @access  Private
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const { cancelReason } = req.body;
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check if this is the user's appointment or if user is admin
    if (appointment.patient.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    
    appointment.status = 'cancelled';
    if (cancelReason) {
      appointment.cancelReason = cancelReason;
    }
    
    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Reschedule appointment
// @route   PUT /api/appointments/:id/reschedule
// @access  Private
router.put('/:id/reschedule', protect, async (req, res) => {
  try {
    const { date, time } = req.body;
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check if this is the user's appointment or if user is admin
    if (appointment.patient.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    
    appointment.date = date;
    appointment.time = time;
    appointment.status = 'upcoming';
    appointment.notes = `${appointment.notes}\nRescheduled from ${appointment.date} ${appointment.time}`;
    
    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
