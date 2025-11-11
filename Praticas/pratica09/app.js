var express = require('express');
var apidocsRouter = require('./routes/apidocsRouter');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api-docs', apidocsRouter);

module.exports = app;
