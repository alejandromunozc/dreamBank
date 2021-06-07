"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const user_controller_1 = require("../controllers/user.controller");
router.post('/login', user_controller_1.login);
router.post('/register', user_controller_1.register);
exports.default = router;
