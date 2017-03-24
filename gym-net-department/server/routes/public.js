"use strict";

const express = require("express");
const clientRoutes = require("./clientRoutes");
const publicRoutes = express.Router();
publicRoutes.get("", function (request, response) {
    response.json({
        title: "GymNet Department Server",
        text: "Welcome in api!!!"
    });
});

publicRoutes.use("/client",clientRoutes)
exports.publicRoutes = publicRoutes;
