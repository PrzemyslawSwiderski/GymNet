"use strict";

const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    time: {type: String, required: true},
    date: {type: String, required: true},
    place: {type: String, required: true},
    ifCancelled: {type: Boolean, default: false}
});
module.exports = mongoose.model("Reservation", reservationSchema);