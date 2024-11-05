const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');  // Importa dotenv

dotenv.config();  // Carrega as variáveis de ambiente do .env

const readingsRouter = require('./routes/routes'); // Ajuste o caminho conforme necessário
const userRoutes = require('./routes/userRoutes'); // Importa as rotas de usuário

const app = express();
const mongoDB = process.env.MONGODB_URI; // Carregando a URI do .env

// Conectar ao MongoDB
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexão com o MongoDB estabelecida!'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

app.use(bodyParser.json());
app.use('/api/readings', readingsRouter); // Prefixo das rotas
app.use('/api/users', userRoutes); // Prefixo das rotas de usuário

const porto = 5000; // Altere a porta para 5000
app.listen(porto, () => {
    console.log('Servidor em execução no porto: ' + porto);
});

