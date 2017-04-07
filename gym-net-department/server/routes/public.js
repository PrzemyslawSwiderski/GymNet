"use strict";

const express = require("express");
const clientRoutes = require("./clientRoutes");
const reservationRoutes = require("./reservationRoutes");
const publicRoutes = express.Router();
publicRoutes.get("", function (request, response) {
    response.json({
        title: "GymNet Department Server",
        text: "Welcome in api!!!"
    });
});

publicRoutes.use("/client",clientRoutes);
publicRoutes.use("/reservation",reservationRoutes);
exports.publicRoutes = publicRoutes;
