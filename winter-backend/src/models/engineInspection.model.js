const mongoose = require('mongoose');
const { Schema } = mongoose;

const engineInspectionSchema = new Schema({
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
  engineOilCondition: { 
    type: String, 
    enum: ['Good', 'Bad'], 
    required: true 
  },
  engineOilColor: { 
    type: String, 
    enum: ['Clean', 'Brown', 'Black'], 
    required: true 
  },
  brakeFluidCondition: { 
    type: String, 
    enum: ['Good', 'Bad'], 
    required: true 
  },
  brakeFluidColor: { 
    type: String, 
    enum: ['Clean', 'Brown', 'Black'], 
    required: true 
  },
  oilLeakInEngine: { 
    type: Boolean, 
    required: true 
  },
  engineOverallSummary: { 
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

const EngineInspection = mongoose.model('EngineInspection', engineInspectionSchema);

module.exports = EngineInspection;
