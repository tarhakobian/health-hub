
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
  },
  experience: {
    type: String,
    default: ''
  },
  education: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  qualifications: {
    type: [String],
    default: []
  },
  languages: {
    type: [String],
    default: ["Հայերեն", "Ռուսերեն"]
  },
  availability: {
    type: [String],
    default: ["Երկուշաբթի", "Չորեքշաբթի", "Ուրբաթ"]
  },
  schedule: {
    type: Object,
    default: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: ''
    }
  },
  // Custom ID field that can be set manually if needed
  customId: {
    type: String
  }
}, { timestamps: true });

// Convert MongoDB _id to string id for consistency with doctors.js
// Also use customId if available
doctorSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    ret.id = doc.customId || ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Doctor', doctorSchema);
