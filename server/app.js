const port = 6969;

const express = require('express');
// const logger = require('morgan');
const { generateId } = require('./utils/utils');

let route_controller = require('./routes/route_controller');
let socket_controller = require('./sockets/socket_controller');


var app = express();

// Set up middleware
//app.use(logger('dev'));

// set view engine
app.set('view engine', 'ejs');

// set up static routes for JS and CSS
app.use(express.static('./public'));

// Set up routes
route_controller(app);

var server = require('http').Server(app);

// Set up the sockets
var io = require('socket.io').listen(server);
socket_controller(io);


server.listen(port, () => console.log(`Example app listening on port ${port}!`));