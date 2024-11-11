const Reading = require('../models/model');

// Criar uma nova leitura
exports.createReading = async (req, res) => {
  try {
    const reading = new Reading(req.body);
    await reading.save();
    res.status(201).json(reading);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obter todas as leituras
exports.getAllReadings = async (req, res) => {
  try {
    const readings = await Reading.find();
    res.status(200).json(readings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obter uma leitura específica por ID
exports.getReadingById = async (req, res) => {
  try {
    const reading = await Reading.findById(req.params.id);
    if (!reading) return res.status(404).json({ message: 'Reading not found' });
    res.status(200).json(reading);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Atualizar uma leitura
exports.updateReading = async (req, res) => {
  try {
    const reading = await Reading.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!reading) return res.status(404).json({ message: 'Reading not found' });
    res.status(200).json(reading);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Deletar uma leitura
exports.deleteReading = async (req, res) => {
  try {
    const reading = await Reading.findByIdAndDelete(req.params.id);
    if (!reading) return res.status(404).json({ message: 'Reading not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Obter a leitura mais recente
exports.getMostRecentReading = async (req, res) => {
  try {
    const reading = await Reading.findOne().sort({ createdAt: -1 });
    if (!reading) return res.status(404).json({ message: 'No readings found' });
    res.status(200).json(reading);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};