"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const USER = encodeURIComponent(config_1.config.dbUser || '');
const PASSWORD = encodeURIComponent(config_1.config.dbPassword || '');
const DB_NAME = config_1.config.dbName || '';
const HOST = config_1.config.dbHost || '';
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DB_NAME}?retryWrites=true&w=majority`;
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected successfully to mongo');
}).catch(error => {
    console.log(error);
});
