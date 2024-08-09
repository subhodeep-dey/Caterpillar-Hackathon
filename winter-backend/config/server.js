const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const helmet = require( 'helmet' ),
server = express();
const morgan = require("morgan");
const middleware = require('../middlewares/index.js')
const limiter = require('../utils/rateLimit.js')
const { setRoutes } = require( './routes' );
// For security

server.use( helmet() );

server.use(morgan("common"))
server.use(limiter);
// server.use(middleware.maintenanceMiddleware);
server.use(middleware.errorMiddleware)

const cors = require( 'cors' ),
    // Allow Origins according to your need.
    corsOptions = {
        'origin': '*'
    };
server.use( cors( corsOptions ) );

server.use( bodyParser.json() );

// Setting up Routes
setRoutes( server );

module.exports = { server };