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
  public: {
    type: Boolean,
    required: true,
    default: false
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
