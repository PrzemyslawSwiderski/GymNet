"use strict";

var logger = require("winston");
const socketIO = require("socket.io-client");
const config = require("./config/server.config.json");
const consts = require("../server/dataAccess/models/consts");
const UserModel = require("./dataAccess/models/userModel");
const ReservationModel = require("./dataAccess/models/reservationModel");

function initSocketIO() {
    logger.info("Initializing socketIO");

    var intervalTime = 5 * 1000 * 60; // minutes_number * ms * second = miliseconds number

    var central_address = process.env.CENTRAL_ADDRESS || config.centralAddress;

    var io = socketIO.connect(central_address + "/backupLine", {forceNew: true});

    setInterval(function () {
        UserModel.find({role: consts.USER_ROLE_CLIENT}, function (err, clients) {
            if (err) {
                logger.error(err);
                io.emit("backup", {
                    departmentIdentifier: config.departmentIdentifier,
                    date: new Date(),
                    message: err,
                    collectionData: clients
                });
                return;
            }
            logger.info("Emitting Clients collection");
            io.emit("backup", {
                departmentIdentifier: config.departmentIdentifier,
                date: new Date(),
                message: "Emitting Clients collection",
                collectionData: clients
            });
        });

        ReservationModel.find({}, function (err, reservations) {
            if (err) {
                logger.error(err);
                io.emit("backup", {
                    departmentIdentifier: config.departmentIdentifier,
                    date: new Date(),
                    message: err,
                    collectionData: reservations
                });
                return;
            }
            logger.info("Emitting Reservations collection");
            io.emit("backup", {
                departmentIdentifier: config.departmentIdentifier,
                date: new Date(),
                message: "Emitting Reservations collection",
                collectionData: reservations
            });
        });
    }, intervalTime);


    diagnoseConnection(io);
}

function diagnoseConnection(io) {

    io.on("error", function () {
        logger.info("Error in connecting socket");

    });
    io.on("connect", function () {
        logger.info("Connected to central server");

    });
    io.on("connect_error", function () {
        logger.info("connect_error");
    });
    io.on("connect_timeout", function () {
        logger.info("connect_timeout");
    });
    io.on("disconnect", function () {
        logger.info("Disconnected from central server");

    });
    io.on("reconnect", function () {
        logger.info("Reconnecting to socket");
    });
    io.on("reconnect_attempt", function () {
        logger.info("reconnect_attempt");
    });
    io.on("reconnect_error", function () {
        logger.info("Can not connect to central server.");
    });

    io.on("reconnect_failed", function () {
        logger.info("reconnect_failed");
    });
    io.on("reconnecting", function () {
        logger.info("reconnecting");
    });
}

module.exports = initSocketIO;