"use strict";

const mongoose = require("mongoose");
const clientSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: Number,
    joinDate: Date,
    city: String,
    street: String,
    postalCode: String
});
module.exports = mongoose.model("Client", clientSchema);