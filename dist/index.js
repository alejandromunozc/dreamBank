"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./middlewares/passport"));
require("./connectDb");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const account_routes_1 = __importDefault(require("./routes/account.routes"));
const transaction_routes_1 = __importDefault(require("./routes/transaction.routes"));
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
passport_1.default.use(passport_2.default);
app.listen(config_1.config.port, () => {
    console.log(`listening http://localhost:${config_1.config.port}`);
});
app.use(user_routes_1.default);
app.use(account_routes_1.default);
app.use(transaction_routes_1.default);