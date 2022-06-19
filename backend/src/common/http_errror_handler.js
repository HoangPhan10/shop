"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.HttpErrorHandler = void 0;
var http_1 = require("../lib/http");
var product_1 = require("../product/product");
var order_1 = require("../order/order");
var customer_1 = require("../customer/customer");
var commonErrors = new Set(__spreadArray(__spreadArray(__spreadArray([], Object.values(product_1.ProductNS.Errors), true), Object.values(order_1.OrderNS.Errors), true), Object.values(customer_1.CustomerNS.Errors), true));
function HttpErrorHandler(err, req, res, next) {
    if (commonErrors.has(err)) {
        err = new http_1.HttpError(err.message, 400 /* BadRequest */);
    }
    if (err && typeof err.HttpStatusCode === "function") {
        var message = err.message;
        res.status(err.HttpStatusCode() || 500).json({
            error: message
        });
        return;
    }
    res.status(500).send({
        error: "internal server error"
    });
}
exports.HttpErrorHandler = HttpErrorHandler;
