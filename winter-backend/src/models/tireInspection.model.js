const mongoose = require('mongoose');
const { Schema } = mongoose;

const tireInspectionSchema = new Schema({
  inspectionID: { 
    type: Schema.Types.ObjectId, 
    ref: 'Inspection', 
    required: true 
  },
  tirePressureLeftFront: { 
    type: Number, 
    required: true 
  },
  tirePressureRightFront: { 
    type: Number, 
    required: true 
  },
  tireConditionLeftFront: { 
    type: String, 
    enum: ['Good', 'Ok', 'Needs Replacement'], 
    required: true 
  },
  tireConditionRightFront: { 
    type: String, 
    enum: ['Good', 'Ok', 'Needs Replacement'], 
    required: true 
  },
  tirePressureLeftRear: { 
    type: Number, 
    required: true 
  },
  tirePressureRightRear: { 
    type: Number, 
    required: true 
  },
  tireConditionLeftRear: { 
    type: String, 
    enum: ['Good', 'Ok', 'Needs Replacement'], 
    required: true 
  },
  tireConditionRightRear: { 
    type: String, 
    enum: ['Good', 'Ok', 'Needs Replacement'], 
    required: true 
  },
  overallTireSummary: { 
    type: String, 
    maxlength: 1000 
  },
  attachedImages: [{ 
    type: String, 
    trim: true,
    default: null
  }]
}, {
  timestamps: true
});

const TireInspection = mongoose.model('TireInspection', tireInspectionSchema);

module.exports = TireInspection;
