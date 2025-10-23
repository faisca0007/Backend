require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');

const app = express();

// Conectar ao MongoDB
const connectionString = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(connectionString)
  .then(() => {
    console.log('Conectado ao MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Erro ao conectar com MongoDB:', error);
  });

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rota básica de teste
app.get('/', (req, res) => {
  res.json({ message: 'API Pratica07 funcionando!' });
});

// Rotas de produtos
const produtosRouter = require('./routes/produtosRouter');
app.use('/produtos', produtosRouter);

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;