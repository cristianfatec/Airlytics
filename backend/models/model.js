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
    timestamp: {
      type: Date,
      default: Date.now, // Define um valor padrão usando a data e hora atuais
    },
  },
  { timestamps: true },
); 

const Reading = mongoose.model('Reading', readingSchema);

module.exports = Reading;
