"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transactionSchema = new mongoose_1.Schema({
    commerce: {},
    amount: {},
    state: {},
    account: {}
}, {
    timestamps: true
});
exports.default = mongoose_1.model('Transaction', transactionSchema);
