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
const getUserAccounts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const accounts = yield account_1.default.aggregate([
        {
            $match: { user: userId }
        }
    ]);
    // const user = await User.aggregate([
    //   {
    //     $match: { _id: new mongoose.Types.ObjectId(userId) }
    //   },
    //   {
    //     $lookup: {
    //       from: 'accounts',
    //       localField: '_id',
    //       foreignField: 'user',
    //       as: 'account'
    //     }
    //   },
    //   {
    //     $unwind: '$account'
    //   },
    //   {
    //     $project: {
    //       _id:0,
    //       name:1,
    //       identification:1,
    //       'account._id':1,
    //       'account.accountName':1
    //     }
    //   }
    // ])
    return accounts;
});
exports.getUserAccounts = getUserAccounts;
const createUserAccount = (userId, name) => __awaiter(void 0, void 0, void 0, function* () {
    const newAccount = new account_1.default();
    newAccount.accountName = name;
    newAccount.user = userId;
    return yield newAccount.save();
});
exports.createUserAccount = createUserAccount;
