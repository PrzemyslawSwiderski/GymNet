"use strict";

process.env.NODE_ENV = "test";

const chai = require("chai");
const should = chai.should();
const mongoose = require("../server/dataAccess/dataAccessInit")();
var logger = require("../server/initLogger");
var Client = require("../server/dataAccess/models/clientModel");

describe("Test Database Operations", function () {

    function clearDB() {
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function () {
            });
        }
    }

    function populateDatabase(onInsert) {
        var clients = [{
            firstName: "client1",
            lastName: "cfs",
            email: "test",
            phoneNumber: 212332422,
            joinDate: new Date(),
            city: "test",
            street: "test",
            postalCode: "test"
        },
            {
                firstName: "client2",
                lastName: "test",
                email: "test",
                phoneNumber: 221132422,
                joinDate: new Date(),
                city: "test",
                street: "test",
                postalCode: "test"
            }, {
                firstName: "client3",
                lastName: "test",
                email: "test",
                phoneNumber: 2132322,
                joinDate: new Date(),
                city: "test",
                street: "test",
                postalCode: "test"
            }
        ];
        Client.collection.insert(clients, onInsert);
    }

    beforeEach(function (done) {
        clearDB();
        return done();
    });


    afterEach(function (done) {
        mongoose.disconnect();
        return done();
    });

    it("should be invalid if name is empty", function (done) {
        var client = new Client();

        client.validate(function (err) {
            err.errors.should.to.exist;
            logger.info("Proper lack of required fields");
            done();
        });
    });

    it("it should save clients in database", function (done) {
            populateDatabase(function () {
                logger.info("Saved clients");
                done();
            });
        }
    );

    it("it should list all clients in database", function (done) {
            populateDatabase(function () {
                Client.find({}, function (err, docs) {
                    if (err) return done(err);
                    logger.info("Fetched clients are: "+docs);
                    docs.length.should.equal(3);
                    done();
                });
            });

        }
    );

});
