"use strict";

var logger = require("winston");
const socketIO = require("socket.io");
const Backup = require("./dataAccess/models/backupModel");

function initSocketIO(server) {
    logger.info("Initializing socketIO");

    const io = socketIO.listen(server);

    io.of("backupLine").on("connection", function (socket) {
        logger.info("A user connected to backup namespace");
        socket.on("disconnect", function () {
            logger.info("User disconnected from backup namespace");
        });

        socket.on("backup", function (collection) {
            logger.info("Received Collection:", collection);
            Backup.create(collection, function (err) {
                if(err) logger.error(err);
            });
        });

    });
}

module.exports = initSocketIO;