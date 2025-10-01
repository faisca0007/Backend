var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// === ADICIONE ESTA LINHA ===
const tarefaRouter = require('./routes/tarefaRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// === ADICIONE ESTA LINHA ===
app.use('/tarefas', tarefaRouter);

module.exports = app;