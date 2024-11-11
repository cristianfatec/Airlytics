const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // Importa dotenv

dotenv.config(); // Carrega as variáveis de ambiente do .env

const readingsRouter = require('./routes/routes'); // Ajuste o caminho conforme necessário
const userRoutes = require('./routes/userRoutes'); // Importa as rotas de usuário

const app = express();
const mongoDB = process.env.MONGODB_URI; // Carregando a URI do .env

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conexão com o MongoDB estabelecida!'))
  .catch((error) => console.error('Erro ao conectar com o MongoDB:', error));

  
app.use(bodyParser.json());
app.use('/readings', readingsRouter); // Prefixo das rotas
app.use('/users', userRoutes); // Prefixo das rotas de usuário
app.get('/', (req, res) => {
  res.send('success');
});

const porto = 5000; // Altere a porta para 5000
app.listen(porto, () => {
  console.log('Servidor em execução no porto: ' + porto);
});
