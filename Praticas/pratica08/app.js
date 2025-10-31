require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usuariosRouter = require('./routes/usuariosRouter');
var produtosRouter = require('./routes/produtosRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/usuarios', usuariosRouter);
app.use('/produtos', produtosRouter);

module.exports = app;
