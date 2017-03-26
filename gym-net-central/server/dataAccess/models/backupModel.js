"use strict";

/**
 * Created by PSWIDERSKI on 24.03.2017.
 */

const mongoose = require("mongoose");
const backupSchema = mongoose.Schema({
    date: { type: Date, required: true },
    departmentIdentifier: { type: String, required: true },
    message: { type: mongoose.Schema.Types.Mixed, required: true },
    collectionData: { type: mongoose.Schema.Types.Mixed, required: true }
});
module.exports = mongoose.model("Backup", backupSchema);
