const mongoose = require("mongoose");

const { Schema } = mongoose;

//for DRYness, reuseablity, readabilty
const requiredString = {
  type: String,
  required: true,
};

const requiredNumber = {
  type: Number,
  required: true,
};

const logEntrySchema = new Schema(
  {
    title: requiredString,
    description: requiredString,
    comments: String,
    image: String,
    rating: {
      type: Number,
      min: 1,
      max: 10,
      default: 1,
    },
    latitude: { ...requiredNumber, min: -90, max: 90 },
    longitude: { ...requiredNumber, min: -180, max: 180 },
    visit_date: {
      required: true,
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const LogEntry = mongoose.model("LogEntry", logEntrySchema);

module.exports = LogEntry;
