"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.averageTransaction = exports.createTransaction = exports.getTransactionDetail = exports.getTransactions = void 0;
const transactionQuery_1 = require("../helpers/queries/transactionQuery");
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const accountTransactions = yield transactionQuery_1.getAccountTransactions(id);
    res.json(accountTransactions);
});
exports.getTransactions = getTransactions;
const getTransactionDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const accountTransactionDetail = yield transactionQuery_1.getAccountTransactionDetail(id);
    res.json(accountTransactionDetail);
});
exports.getTransactionDetail = getTransactionDetail;
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, commerce, amount, state } = req.body;
    const newTransaction = yield transactionQuery_1.createAccountTransaction(id, commerce, amount, state);
    res.json(newTransaction);
});
exports.createTransaction = createTransaction;
const averageTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, initialDate, finalDate } = req.body;
    const average = yield transactionQuery_1.averageAccountTransaction(id, new Date(initialDate), new Date(finalDate));
    res.json(average);
});
exports.averageTransaction = averageTransaction;
