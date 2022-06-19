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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.NewOrderAPI = void 0;
var express = require("express");
var http_1 = require("../lib/http");
var order_1 = require("./order");
var product_1 = require("../product/product");
function NewOrderAPI(bll) {
    var _this = this;
    var status_type = Object.values(order_1.OrderNS.OrderStatus);
    var gender = Object.values(product_1.ProductNS.Gender);
    var router = express.Router();
    var REPORT_QUERY = Object.values(order_1.OrderNS.QueryReport);
    router.get("/order/list", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var query, orders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = {};
                    if (req.query.status) {
                        query.status = http_1.HttpParamValidators.MustBeOneOf(req.query, "status", status_type);
                    }
                    if (req.query.customer_id) {
                        query.customer_id = http_1.HttpParamValidators.MustBeString(req.query, "customer_id", 8);
                    }
                    return [4 /*yield*/, bll.ListOrder(query)];
                case 1:
                    orders = _a.sent();
                    return [2 /*return*/, res.json(orders)];
            }
        });
    }); });
    router.get("/order/get", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = http_1.HttpParamValidators.MustBeString(req.query, "id", 12);
                    return [4 /*yield*/, bll.GetViewOrder(id)];
                case 1:
                    order = _a.sent();
                    res.json(order);
                    return [2 /*return*/];
            }
        });
    }); });
    router.get("/order/filter", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var query, orders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = {
                        status: http_1.HttpParamValidators.MustBeOneOf(req.query, "status", status_type)
                    };
                    if (req.query.gender) {
                        query.gender = http_1.HttpParamValidators.MustBeOneOf(req.query, "gender", gender);
                    }
                    if (req.query.from) {
                        query.from = +http_1.HttpParamValidators.MustBeString(req.query, "from");
                    }
                    if (req.query.to) {
                        query.to = +http_1.HttpParamValidators.MustBeString(req.query, "to");
                    }
                    return [4 /*yield*/, bll.FilterOrder(query)];
                case 1:
                    orders = _a.sent();
                    res.json(orders);
                    return [2 /*return*/];
            }
        });
    }); });
    router.post("/order/create", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var params, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        customer_id: http_1.HttpParamValidators.MustBeString(req.body, "customer_id", 8),
                        itemParams: {
                            product_id: http_1.HttpParamValidators.MustBeString(req.body.itemParams, "product_id", 8),
                            amount: http_1.HttpParamValidators.MustBeNumber(req.body.itemParams, "amount")
                        }
                    };
                    return [4 /*yield*/, bll.CreateOrder(params)];
                case 1:
                    order = _a.sent();
                    res.json(order);
                    return [2 /*return*/];
            }
        });
    }); });
    router.post("/order/update", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, params, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
                    params = {
                        status: http_1.HttpParamValidators.MustBeOneOf(req.body, "status", status_type)
                    };
                    if (req.body.info) {
                        params.info = {
                            name: http_1.HttpParamValidators.MustBeString(req.body.info, "name", 2),
                            phone: http_1.HttpParamValidators.CheckPhone(req.body.info, 'phone', 10),
                            address: http_1.HttpParamValidators.MustBeString(req.body.info, "address", 2)
                        };
                    }
                    if (req.body.itemParams) {
                        params.itemParams = {
                            amount: http_1.HttpParamValidators.MustBeNumber(req.body.itemParams, "amount")
                        };
                    }
                    return [4 /*yield*/, bll.UpdateOrder(id, params)];
                case 1:
                    order = _a.sent();
                    res.json(order);
                    return [2 /*return*/];
            }
        });
    }); });
    router.get('/order/report', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var query, orders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = http_1.HttpParamValidators.MustBeOneOf(req.query, "interval", REPORT_QUERY);
                    return [4 /*yield*/, bll.OrderByReport(query)];
                case 1:
                    orders = _a.sent();
                    res.json(orders);
                    return [2 /*return*/];
            }
        });
    }); });
    return router;
}
exports.NewOrderAPI = NewOrderAPI;
