"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const accountSchema = new mongoose_1.Schema({
    accountName: {},
    typeAccount: {},
    state: {},
    user: {}
}, {
    timestamps: true
});
exports.default = mongoose_1.model('Account', accountSchema);
