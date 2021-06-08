"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = require("../middlewares/passport");
const account_controller_1 = require("../controllers/account.controller");
const router = express_1.Router();
router.get('/account/:id', passport_1.jwtAuth, account_controller_1.getAccounts);
router.post('/account/', passport_1.jwtAuth, account_controller_1.createAccount);
exports.default = router;
