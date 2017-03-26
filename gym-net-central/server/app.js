"use strict";

const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const publicRoutes = require("./routes/public");
const config = require("./config/server.config.json");
var logger = require("./initLogger");
require("./dataAccess/dataAccessInit")();
const app = express();

app.use(cors());

const server = http.createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(require("morgan")("combined",{ stream: logger.stream }));

app.use("/api", publicRoutes.publicRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});

server.listen(normalizePort(process.env.PORT || config.serverPort));
server.on("error", onError);
server.on("listening", onListening);
require("./initSocketIO")(server);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const normalizedPort = parseInt(val, 10);
    if (isNaN(normalizedPort)) {
        // named pipe
        return val;
    }
    if (normalizedPort >= 0) {
        // port number
        return normalizedPort;
    }
    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {

    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            logger.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            logger.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    var host = server.address().address;
    host = (host == "::") ? "localhost" : host;
    logger.info("Listening on " + addr.port);
    logger.info("Running at http://" + host + ":" + addr.port + "\n");
}

module.exports = server; // for testing