

/**
 * Required External Modules
 */

const express = require('express');
require('dotenv').config();

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


/**
 * Server Activation
 */

app.listen(PORT, () => {
    console.log('le serveur écoute le port ' + PORT);
})