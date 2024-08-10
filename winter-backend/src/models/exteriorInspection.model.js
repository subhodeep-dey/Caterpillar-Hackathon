const mongoose = require('mongoose');
const { Schema } = mongoose;

const exteriorInspectionSchema = new Schema({
  inspectionID: { 
    type: Schema.Types.ObjectId, 
    ref: 'Inspection', 
    required: true 
  },
  rustDentOrDamage: { 
    type: Boolean, 
    required: true 
  },
  rustDentOrDamageNotes: { 
    type: String, 
    maxlength: 1000,
    default: null
  },
  oilLeakInSuspension: { 
    type: Boolean, 
    required: true 
  },
  exteriorOverallSummary: { 
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

const ExteriorInspection = mongoose.model('ExteriorInspection', exteriorInspectionSchema);

module.exports = ExteriorInspection;
