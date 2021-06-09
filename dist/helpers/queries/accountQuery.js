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
exports.createUserAccount = exports.getUserAccounts = void 0;
const account_1 = __importDefault(require("../../models/account"));
const enums_1 = require("../enums");
const getUserAccounts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield account_1.default.aggregate([
            {
                $match: { user: userId }
            }
        ]);
    }
    catch (error) {
        return { 'error': error };
    }
});
exports.getUserAccounts = getUserAccounts;
const createUserAccount = (userId, name, typeAccount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAccount = new account_1.default();
        newAccount.accountName = name;
        newAccount.typeAccount = enums_1.ProductType[typeAccount];
        newAccount.user = userId;
        newAccount.state = enums_1.Status[1];
        return yield newAccount.save();
    }
    catch (error) {
        return { 'error': error };
    }
});
exports.createUserAccount = createUserAccount;
