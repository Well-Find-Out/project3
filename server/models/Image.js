const mongoose = require('mongoose');

const { Schema } = mongoose;

const imageSchema = new Schema(
  {
  imageString: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 5000,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  }
},{ collection: "Image"}
);

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;