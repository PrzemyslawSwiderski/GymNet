"use strict";

/**
 * Created by PSWIDERSKI on 23.03.2017.
 */

const logger = require("winston");

function handleError(res, req) {
    return function (error, result) {
        if (error) {
            logger.error({"error": error, "req": req, "res": res});
            res.send({"error": error});
        }
        else if (result) {
            res.send({"success": "success", "result": result});
        }
        else {
            res.send({"success": "success"});
        }
    };
}

function GenericController(model) {

    this.saveAll = function (req, res) {
        var clients = req.body;
        model.collection.insert(clients, handleError(res, req));
    };
    this.create = function (req, res) {
        var client = req.body;
        model.create(client, handleError(res, req));
    };
    this.update = function (req, res) {
        var client = req.body;
        var _id = req.params._id;
        model.update({_id: _id}, client, handleError(res, req));
    };
    this.delete = function (req, res) {
        var _id = req.params._id;
        model.remove({_id: _id}, handleError(res, req));
    };
    this.retrieveAll = function (req, res) {
        model.find({}, handleError(res, req));
    };
    this.retrieveBy = function (req, res) {
        model.find(req.query, handleError(res, req));
    };
    this.findById = function (req, res) {
        var _id = req.params._id;
        model.findById(_id, handleError(res, req));
    }
}
module.exports = GenericController;