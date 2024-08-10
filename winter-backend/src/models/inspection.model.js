const mongoose = require('mongoose');
const { Schema } = mongoose;

const inspectionSchema = new Schema({
  vehicleID: { 
    type: Schema.Types.ObjectId, 
    ref: 'Vehicle', 
    required: true 
  },
  inspectorName: { 
    type: String, 
    required: true, 
    trim: true, 
    maxlength: 100 
  },
  inspectorEmployeeID: { 
    type: String, 
    required: true, 
    trim: true, 
    maxlength: 50 
  },
  inspectionDateTime: { 
    type: Date, 
    required: true,
    default: Date.now 
  },
  location: { 
    type: String, 
    required: true, 
    trim: true, 
    maxlength: 255 
  },
  geoCoordinates: { 
    type: String, 
    trim: true, 
    maxlength: 50,
    default: null
  },
  serviceMeterHours: { 
    type: Number, 
    required: true 
  },
  inspectorSignature: { 
    type: Buffer, 
    default: null 
  }
}, {
  timestamps: true
});

inspectionSchema.index({ inspectionDateTime: 1 });

const Inspection = mongoose.model('Inspection', inspectionSchema);

module.exports = Inspection;
