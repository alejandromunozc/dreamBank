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
exports.findUser = exports.userLogin = exports.newUserRegister = void 0;
const user_1 = __importDefault(require("../../models/user"));
const jwt_1 = require("../jwt");
const newUserRegister = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield user_1.default.findOne({ identification: user.identification });
    if (userExists) {
        return { msg: 'User already exists' };
    }
    const newUser = new user_1.default(user);
    newUser.password = yield newUser.encryptPass(user.password);
    yield newUser.save();
    return newUser;
});
exports.newUserRegister = newUserRegister;
const userLogin = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield user_1.default.findOne({ identification: user.identification });
    if (!userExists) {
        return { msg: 'User not exists' };
    }
    const passMatch = new user_1.default(userExists);
    const isMatch = yield passMatch.matchPass(user.password);
    if (isMatch) {
        return { token: jwt_1.createToken(user) };
    }
    return { Error: 'Identification or Password are incorrect' };
});
exports.userLogin = userLogin;
const findUser = (identification) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.findOne({ identification });
});
exports.findUser = findUser;