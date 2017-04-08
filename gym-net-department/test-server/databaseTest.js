"use strict";

process.env.NODE_ENV = "test";

const chai = require("chai");
const consts = require("../server/dataAccess/models/consts");
const should = chai.should();
const mongoose = require("../server/dataAccess/dataAccessInit")();
var logger = require("../server/initLogger");
var User = require("../server/dataAccess/models/userModel");

describe("Test Database Operations", function () {

    function clearDB() {
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function () {
            });
        }
    }

    function populateDatabase(onInsert) {
        var users = [{
            firstName: "user1",
            lastName: "cfs",
            email: "test",
            password: "pass",
            phoneNumber: 212332422,
            joinDate: new Date(),
            city: "test",
            role: consts.USER_ROLE_ADMIN,
            street: "test",
            postalCode: "test"
        },
            {
                firstName: "user2",
                lastName: "test",
                email: "test",
                password: "pass",
                phoneNumber: 221132422,
                joinDate: new Date(),
                role: consts.USER_ROLE_CLIENT,
                city: "test",
                street: "test",
                postalCode: "test"
            }, {
                firstName: "user3",
                lastName: "test",
                email: "test",
                password: "pass",
                role: consts.USER_ROLE_EMPLOYEE,
                phoneNumber: 2132322,
                joinDate: new Date(),
                city: "test",
                street: "test",
                postalCode: "test"
            }
        ];
        User.collection.insert(users, onInsert);
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
        var user = new User();

        user.validate(function (err) {
            err.errors.should.to.exist;
            logger.info("Proper lack of required fields");
            done();
        });
    });

    it("it should save users in database", function (done) {
            populateDatabase(function () {
                logger.info("Saved users");
                done();
            });
        }
    );

    it("it should list all users in database", function (done) {
            populateDatabase(function () {
                User.find({}, function (err, docs) {
                    if (err) return done(err);
                    logger.info("Fetched users are: " + docs);
                    docs.length.should.equal(3);
                    done();
                });
            });

        }
    );

});
