const mongoose = require('mongoose');
const { Schema } = mongoose;

const vehicleSchema = new Schema({
  serialNumber: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    maxlength: 50
  },
  model: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 50
  },
  customerName: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 100
  },
  catCustomerID: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 50
  }
}, {
  timestamps: true
});

vehicleSchema.index({ serialNumber: 1 });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
