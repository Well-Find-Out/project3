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
  details: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 500,
    trim: true
  },  
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp)
  },
  pictures: [
    {
        fileName: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    }
  ]
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
