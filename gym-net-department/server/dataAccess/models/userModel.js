"use strict";

const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    // One of the following: CLIENT, EMPLOYEE, ADMIN
    role: {type: String, required: true},
    password: {type: String, required: true},
    phoneNumber: Number,
    joinDate: {type: Date, default: new Date()},
    city: String,
    street: String,
    postalCode: String,
    ifLoggedIn: {type: Boolean, default: false}
});
module.exports = mongoose.model("User", userSchema);