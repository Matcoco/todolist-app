

/**
 * Required External Modules
 */
const cors = require('cors')
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
 app.use(cors());
 app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
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