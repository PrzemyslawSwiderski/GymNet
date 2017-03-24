"use strict";

/**
 * Created by PSWIDERSKI on 22.03.2017.
 */

var logger = require("winston");
const config = require("../config/server.config.json");

function getDatabaseConnectionString(){
    return process.env.NODE_ENV === "test" ? config.testDatabaseConnectionString : config.databaseConnectionString;
}

function initDatabaseConnection() {
    var Mongoose = require("mongoose");

    Mongoose.Promise = global.Promise;
    if (Mongoose.mongooseInstance) {
        return Mongoose.mongooseInstance;
    }
    Mongoose.mongooseConnection = Mongoose.connection;

    Mongoose.mongooseConnection.on("connecting", function () {
        logger.info("connecting to MongoDB...");
    });
    Mongoose.mongooseConnection.on("error", function (error) {
        logger.error("Error in MongoDb connection: " + error);
        Mongoose.mongooseInstance = Mongoose.disconnect();
    });
    Mongoose.mongooseConnection.on("connected", function () {
        logger.info("MongoDB connected!");
    });
    Mongoose.mongooseConnection.once("open", function () {
        logger.info("MongoDB connection opened!");
    });
    Mongoose.mongooseConnection.on("reconnected", function () {
        logger.info("MongoDB reconnected!");
    });
    Mongoose.mongooseConnection.on("disconnected", function () {
        logger.info("MongoDB disconnected!");
        Mongoose.mongooseInstance = Mongoose.connect(getDatabaseConnectionString(), {
            server: {
                auto_reconnect: true,
                reconnectTries: 10
            }
        });
    });
    Mongoose.mongooseInstance = Mongoose.connect(getDatabaseConnectionString(), {
        server: {
            auto_reconnect: true,
            reconnectTries: 10
        }
    });
    return Mongoose;
}
module.exports = initDatabaseConnection;


