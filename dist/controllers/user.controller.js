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
exports.register = exports.login = void 0;
const userQuery_1 = require("../helpers/queries/userQuery");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.identification || !req.body.password) {
        return res.json({ Error: 'Must send identification and password' });
    }
    const loginUser = yield userQuery_1.userLogin(req.body);
    return res.json(loginUser);
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name || !req.body.identification || !req.body.password) {
        return res.json({ Error: 'incomplete data: name, identification and password are required' });
    }
    const newUser = yield userQuery_1.newUserRegister(req.body);
    return res.json(newUser);
});
exports.register = register;
