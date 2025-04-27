
const express = require('express');
const fs = require('fs');
const path = require('path');
const Doctor = require('../models/Doctor');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Path to the doctors.js file in the frontend
const doctorsFilePath = path.join(__dirname, '../../src/data/doctors.js');

// Helper function to update the doctors.js file
const updateDoctorsFile = async () => {
  try {
    // Get all doctors from the database
    const doctors = await Doctor.find({}).lean();

    // Find the highest current ID
    let maxId = 32; // Starting from ID 32 as specified
    doctors.forEach(doc => {
      const docId = parseInt(doc.id || doc._id.toString(), 10);
      if (!isNaN(docId) && docId > maxId) {
        maxId = docId;
      }
    });

    // Format the data to match the structure in doctors.js
    const doctorsData = doctors.map(doc => {
      // If the doctor doesn't have a numeric ID or it's a new doctor, assign the next ID
      let docId = doc.id || doc._id.toString();
      if (isNaN(parseInt(docId, 10))) {
        maxId += 1;
        docId = maxId.toString();
      }

      return {
        id: docId,
        name: doc.name,
        specialty: doc.specialty,
        image: doc.image,
        education: doc.education || '',
        experience: doc.experience || '',
        bio: doc.bio || '',
        description: doc.description || '',
        qualifications: doc.qualifications || [],
        availability: doc.availability || ["Երկուշաբթի", "Չորեքշաբթի", "Ուրբաթ"],
        languages: doc.languages || ["Հայերեն", "Ռուսերեն"],
        schedule: doc.schedule || {
          monday: '',
          tuesday: '',
          wednesday: '',
          thursday: '',
          friday: ''
        }
      };
    });

  }
  catch(err){
    console.log(err)
  }
}


// Create the content for the doctors.js file
// const fileContent = `
// import { images } from '../assets/images';

// export const doctors = ${JSON.stringify(doctorsData, null, 2)
//   .replace(/"image": "images\.doctor(\d+)"/g, '"image": images.doctor$1')};
// `;

//     // Write to the file
//     fs.writeFileSync(doctorsFilePath, fileContent, 'utf8');
//     console.log('doctors.js file updated successfully');
//     return true;
//   } catch (error) {
//     console.error('Error updating doctors.js file:', error);
//     throw error;
//   }
// };

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (doctor) {
      res.json(doctor);
    } else {
      console.error(`Doctor not found with id ${req.params.id}`);
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    console.error('Error fetching doctor by ID:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Create a doctor
// @route   POST /api/doctors
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const {
      name,
      specialty,
      image,
      experience,
      education,
      bio,
      description,
      qualifications,
      languages,
      availability,
      schedule
    } = req.body;

    // Debug log to see what's being received
    console.log('Creating doctor with data:', req.body);

    const doctor = new Doctor({
      name,
      specialty,
      image: image || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      experience,
      education,
      bio,
      description,
      qualifications,
      languages,
      availability,
      schedule
    });

    const createdDoctor = await doctor.save();
    console.log('Doctor created successfully:', createdDoctor);

    // Update the doctors.js file
    await updateDoctorsFile();

    res.status(201).json(createdDoctor);
  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Update a doctor
// @route   PUT /api/doctors/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const {
      name,
      specialty,
      image,
      experience,
      education,
      bio,
      description,
      qualifications,
      languages,
      availability,
      schedule
    } = req.body;

    console.log(`Updating doctor with ID: ${req.params.id}`, req.body);

    const doctor = await Doctor.findById(req.params.id);

    if (doctor) {
      doctor.name = name || doctor.name;
      doctor.specialty = specialty || doctor.specialty;
      doctor.image = image || doctor.image;
      doctor.experience = experience || doctor.experience;
      doctor.education = education || doctor.education;
      doctor.bio = bio || doctor.bio;
      doctor.description = description || doctor.description;
      doctor.qualifications = qualifications || doctor.qualifications;
      doctor.languages = languages || doctor.languages;
      doctor.availability = availability || doctor.availability;
      doctor.schedule = schedule || doctor.schedule;

      const updatedDoctor = await doctor.save();
      console.log('Doctor updated successfully:', updatedDoctor);

      // Update the doctors.js file
      await updateDoctorsFile();

      res.json(updatedDoctor);
    } else {
      console.error(`Doctor not found with id ${req.params.id}`);
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Delete a doctor
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    console.log(`Attempting to delete doctor with ID: ${req.params.id}`);

    const doctor = await Doctor.findById(req.params.id);

    if (doctor) {
      await doctor.deleteOne();
      console.log(`Doctor with ID ${req.params.id} successfully deleted`);

      // Update the doctors.js file
      await updateDoctorsFile();

      res.json({ message: 'Doctor removed' });
    } else {
      console.error(`Doctor not found with id ${req.params.id}`);
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Update the doctors.js file manually
// @route   POST /api/doctors/update-file
// @access  Private/Admin
router.post('/update-file', protect, admin, async (req, res) => {
  try {
    const success = await updateDoctorsFile();
    res.json({ message: 'doctors.js file updated successfully', success });
  } catch (error) {
    console.error('Error updating doctors.js file:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
