const Reading = require('../models/model');

// Criar uma nova leitura
exports.createReading = async (req, res) => {
  try {
    // Validando dados de entrada
    const { humidity, temperature, mq_sensor_value, mq_voltage, timestamp } = req.body;
    
    if (!humidity || !temperature || !mq_sensor_value || !mq_voltage) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    // Criar a nova leitura
    const reading = new Reading({
      humidity,
      temperature,
      mq_sensor_value,
      mq_voltage,
      timestamp: timestamp ? new Date(timestamp) : Date.now(), // Valida e converte o timestamp
    });

    await reading.save();
    res.status(201).json(reading);
  } catch (error) {
    res.status(400).json({ message: `Erro ao criar leitura: ${error.message}` });
  }
};

// Obter todas as leituras
exports.getAllReadings = async (req, res) => {
  try {
    const readings = await Reading.find();
    res.status(200).json(readings);
  } catch (error) {
    res.status(500).json({ message: `Erro ao buscar leituras: ${error.message}` });
  }
};

// Obter uma leitura específica por ID
exports.getReadingById = async (req, res) => {
  try {
    const reading = await Reading.findById(req.params.id);
    if (!reading) return res.status(404).json({ message: 'Leitura não encontrada' });
    res.status(200).json(reading);
  } catch (error) {
    res.status(500).json({ message: `Erro ao buscar leitura: ${error.message}` });
  }
};

// Atualizar uma leitura
exports.updateReading = async (req, res) => {
  try {
    const updatedData = req.body;

    if (updatedData.timestamp) {
      updatedData.timestamp = new Date(updatedData.timestamp); // Converte o timestamp
    }

    const reading = await Reading.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true, // Executa as validações do schema ao atualizar
    });

    if (!reading) return res.status(404).json({ message: 'Leitura não encontrada' });
    res.status(200).json(reading);
  } catch (error) {
    res.status(400).json({ message: `Erro ao atualizar leitura: ${error.message}` });
  }
};

// Deletar uma leitura
exports.deleteReading = async (req, res) => {
  try {
    const reading = await Reading.findByIdAndDelete(req.params.id);
    if (!reading) return res.status(404).json({ message: 'Leitura não encontrada' });
    res.status(204).send(); // Nenhum conteúdo para retornar após a exclusão
  } catch (error) {
    res.status(500).json({ message: `Erro ao deletar leitura: ${error.message}` });
  }
};
