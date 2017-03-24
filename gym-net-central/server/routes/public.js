"use strict";

const express = require("express");
const publicRoutes = express.Router();

publicRoutes.get("", function (request, response) {
    response.json({
        title: "GymNet Central Server",
        text: "Welcome in api!!!"
    });
});
exports.publicRoutes = publicRoutes;
