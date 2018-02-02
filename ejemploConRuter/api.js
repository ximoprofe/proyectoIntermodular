const dotenv = require('dotenv').config({path: './src/.env'});
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MLAB, () => {
  console.log('\nMongoDB successfully connected.');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect API routes to "/api" prefix
const routes = require('./routes');
app.use('/api', routes);

app.listen(process.env.PORT, () => {
  console.log('\nServer running on http://localhost:%d', process.env.PORT);
});
