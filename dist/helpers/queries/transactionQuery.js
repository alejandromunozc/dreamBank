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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.averageAccountTransaction = exports.createAccountTransaction = exports.getAccountTransactionDetail = exports.getAccountTransactions = void 0;
const transaction_1 = __importDefault(require("../../models/transaction"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../../config/config");
const getAccountTransactions = (accountId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield transaction_1.default.aggregate([
        {
            $match: { account: accountId }
        }
    ]);
});
exports.getAccountTransactions = getAccountTransactions;
const getAccountTransactionDetail = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const taxesTransaction = parseFloat(config_1.config.taxes);
    return yield transaction_1.default.aggregate([
        {
            $match: {
                _id: new mongoose_1.default.Types.ObjectId(transactionId)
            }
        },
        {
            $lookup: {
                from: 'accounts',
                localField: 'account',
                foreignField: '_id',
                as: 'account'
            }
        },
        {
            $unwind: '$account'
        },
        {
            $project: {
                _id: 1,
                commerce: 1,
                amount: 1,
                taxes: { $round: [{ $subtract: ['$amount', { $divide: ['$amount', taxesTransaction] }] }, 2] },
                state: 1,
                'account.accountName': 1,
                createdAt: 1
            }
        }
    ]);
});
exports.getAccountTransactionDetail = getAccountTransactionDetail;
const createAccountTransaction = (accountId, commerce, amount, state) => __awaiter(void 0, void 0, void 0, function* () {
    const newTransaction = new transaction_1.default();
    newTransaction.commerce = commerce;
    newTransaction.amount = amount;
    newTransaction.state = state;
    newTransaction.account = accountId;
    return yield newTransaction.save();
});
exports.createAccountTransaction = createAccountTransaction;
const averageAccountTransaction = (accountId, initialDate, finalDate) => __awaiter(void 0, void 0, void 0, function* () {
    return yield transaction_1.default.aggregate([
        {
            $match: {
                account: new mongoose_1.default.Types.ObjectId(accountId),
                createdAt: { $gte: initialDate, $lte: finalDate }
            }
        },
        {
            $group: {
                _id: accountId,
                averageAmount: { $avg: '$amount' }
            }
        }
    ]);
});
exports.averageAccountTransaction = averageAccountTransaction;
