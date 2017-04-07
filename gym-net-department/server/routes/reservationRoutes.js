"use strict";

const express = require("express");
const router = express.Router();
const GenericController = require("../controllers/genericController");
const ReservationModel = require("../dataAccess/models/reservationModel");

const ReservationController = new GenericController(ReservationModel);

router.get("/all", ReservationController.retrieveAll);
router.get("/", ReservationController.retrieveBy);
router.post("/", ReservationController.create);
router.put("/:_id", ReservationController.update);
router.get("/:_id", ReservationController.findById);
router.delete("/:_id", ReservationController.delete);
module.exports = router;