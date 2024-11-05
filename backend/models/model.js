const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema(
  {
    humidity: {
      type: Number,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    mq_sensor_value: {
      type: Number,
      required: true,
    },
    mq_voltage: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
); 

const Reading = mongoose.model('Reading', readingSchema);

module.exports = Reading;
