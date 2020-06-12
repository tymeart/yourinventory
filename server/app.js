const config = require('./utils/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('./utils/logger');

logger.info('Connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => logger.info('CONNECTED TO MONGODB'))
  .catch(error => logger.error('ERROR CONNECTING TO MONGODB:', error.message));

app.use(bodyParser.json());

module.exports = app;