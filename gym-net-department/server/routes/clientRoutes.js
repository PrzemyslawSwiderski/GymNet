/**
 * Created by PSWIDERSKI on 23.03.2017.
 */
"use strict";

const express = require("express");
const router = express.Router();
const GenericController = require("../controllers/genericController");
const ClientModel = require("../dataAccess/models/clientModel");

const ClientController = new GenericController(ClientModel);

router.get("/all", ClientController.retrieveAll);
router.get("/", ClientController.retrieveBy);
router.post("/", ClientController.create);
router.put("/:_id", ClientController.update);
router.get("/:_id", ClientController.findById);
router.delete("/:_id", ClientController.delete);
module.exports = router;