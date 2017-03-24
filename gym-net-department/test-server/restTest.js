"use strict";

/**
 * Created by PSWIDERSKI on 23.03.2017.
 */

process.env.NODE_ENV = "test";

//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
var logger = require("../server/initLogger");
const tstConfig = require("./config/tests.config.json");
const should = chai.should();


chai.use(chaiHttp);

describe("Test GymNet REST API TEST", function () {
    var server, options = {
        transports: ['websocket'],
        'force new connection': true
    };

    beforeEach(function (done) {
        // start the server
        server = require("../server/app");

        done();
    });

    describe("Test API", function () {

        it("it should return correct API response", function (done) {
                chai.request(server)
                    .get("/api")
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.title.should.be.eql("GymNet Department Server");
                        res.body.text.should.be.ok;
                        done();
                    });
            }
        );

        it("it should return list of all clients", function (done) {
                chai.request(server)
                    .get("/api/client/all")
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.success.should.be.ok;
                        res.body.result.should.not.be.empty;
                        logger.info(res.body.result);
                        done();
                    });
            }
        );


        it("it should return client with the given id", function (done) {
                chai.request(server)
                    .get("/api/client/all")
                    .then(function (res) {
                        var firstItem = res.body.result[0];
                        logger.info("FIRST ITEM: ", firstItem);
                        chai.request(server).get("/api/client/" + firstItem._id).end(function (err, res) {
                            res.should.have.status(200);
                            res.body.success.should.be.ok;
                            res.body.result.should.not.be.empty;
                            logger.info("FIRST ITEM BY ID: ", res.body.result);
                            done();
                        });
                    });
            }
        );

        it("it should return client with the given firstName", function (done) {
                chai.request(server)
                    .get("/api/client/")
                    .query({"firstName": "client1"})
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.success.should.be.ok;
                        res.body.result.should.not.be.empty;
                        logger.info("FETCHED ITEM: ", res.body.result);
                        done();
                    });
            }
        );
    });

});
