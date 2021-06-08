"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductType = void 0;
const mongoose_1 = require("mongoose");
var ProductType;
(function (ProductType) {
    ProductType[ProductType["Cr\u00E9dito \u00E1gil"] = 0] = "Cr\u00E9dito \u00E1gil";
    ProductType[ProductType["Tarjeta de Cr\u00E9dito"] = 1] = "Tarjeta de Cr\u00E9dito";
    ProductType[ProductType["Cuenta de ahorros"] = 2] = "Cuenta de ahorros";
    ProductType[ProductType["Leasing de vivienda"] = 3] = "Leasing de vivienda";
})(ProductType = exports.ProductType || (exports.ProductType = {}));
const accountSchema = new mongoose_1.Schema({
    accountName: {},
    typeAccount: {},
    user: {}
}, {
    timestamps: true
});
exports.default = mongoose_1.model('Account', accountSchema);
