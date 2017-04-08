/**
 * Created by PSWIDERSKI on 23.03.2017.
 */
"use strict";

const express = require("express");
const router = express.Router();
const GenericController = require("../controllers/genericController");
const UserModel = require("../dataAccess/models/userModel");

const UserController = new GenericController(UserModel);

router.get("/all", UserController.retrieveAll);
router.get("/", UserController.retrieveBy);
router.post("/", UserController.create);
router.put("/:_id", UserController.update);
router.get("/:_id", UserController.findById);
router.delete("/:_id", UserController.delete);
module.exports = router;