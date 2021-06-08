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
exports.createAccount = exports.getAccounts = void 0;
const accountQuery_1 = require("../helpers/queries/accountQuery");
const getAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userAccounts = yield accountQuery_1.getUserAccounts(id);
    res.json(userAccounts);
});
exports.getAccounts = getAccounts;
const createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, typeAccount } = req.body;
    const newAccount = yield accountQuery_1.createUserAccount(id, name, typeAccount);
    res.json(newAccount);
});
exports.createAccount = createAccount;
