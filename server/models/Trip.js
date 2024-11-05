const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const { Schema } = mongoose;

const tripSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    type: String,
    required: true,
    trim: true
  },
  text: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 5000,
    trim: true
  },  
  isPublic: {
    type: Boolean,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  category: {
    type: String,
    required: true,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp)
  },  
  pictures: [
    {
      url: {
        type: String
      },
      description: {
        type: String
      },
    }
  ],
  user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
