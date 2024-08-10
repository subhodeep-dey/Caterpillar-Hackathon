const mongoose = require('mongoose');
const { Schema } = mongoose;

const voiceOfCustomerSchema = new Schema({
  inspectionID: { 
    type: Schema.Types.ObjectId, 
    ref: 'Inspection', 
    required: true 
  },
  customerFeedback: { 
    type: String, 
    maxlength: 1000, 
    default: null 
  },
  feedbackImages: [{ 
    type: String, 
    trim: true,
    default: null
  }]
}, {
  timestamps: true
});

const VoiceOfCustomer = mongoose.model('VoiceOfCustomer', voiceOfCustomerSchema);

module.exports = VoiceOfCustomer;
