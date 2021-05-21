

/**
 * Required External Modules
 */

const express = require('express');
require('dotenv').config();
const connection = require("./db-config");
const morgan = require('morgan');
const bodyParser = require('body-parser');
/**
 * App Variables
 */
const app = express();
const PORT = process.env.PORT;

/**
 *  App Configuration
 */

/**
 * Routes Definitions
 */
app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use('/api', require('./routes'));


/**
 * vérification de connexion à la BDD
 */
 connection.connect((err) => {
    if (err) {
      console.error('error connecting: ' + err.stack);
    } else {
      console.log('connected to database with threadId :  ' + connection.threadId);
    }
  });


/**
 * Server Activation
 */

app.listen(PORT, () => {
    console.log('le serveur écoute le port ' + PORT);
})