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
exports.NewCustomerAPI = void 0;
var http_1 = require("../lib/http");
var express = require("express");
var customer_1 = require("./customer");
function NewCustomerAPI(bll, auth_bll) {
    var _this = this;
    var router = express.Router();
    var role_type = Object.values(customer_1.CustomerNS.Role);
    router.get('/customer/list', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var customers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bll.ListCustomer()];
                case 1:
                    customers = _a.sent();
                    res.json(customers);
                    return [2 /*return*/];
            }
        });
    }); });
    router.get('/customer/get', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, customers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
                    return [4 /*yield*/, bll.GetCustomer(id)];
                case 1:
                    customers = _a.sent();
                    res.json(customers);
                    return [2 /*return*/];
            }
        });
    }); });
    router.post('/customer/create', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var params, customer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        name: http_1.HttpParamValidators.MustBeString(req.body, "name", 2),
                        role: http_1.HttpParamValidators.MustBeOneOf(req.body, "role", role_type),
                        username: http_1.HttpParamValidators.MustBeString(req.body, 'username', 2),
                        birthday: http_1.HttpParamValidators.MustBeString(req.body, 'birthday', 10),
                        cccd: http_1.HttpParamValidators.MustBeString(req.body, 'cccd', 8),
                        phone: http_1.HttpParamValidators.CheckPhone(req.body, 'phone', 10)
                    };
                    return [4 /*yield*/, bll.CreateCustomer(params)];
                case 1:
                    customer = _a.sent();
                    res.json(customer);
                    return [2 /*return*/];
            }
        });
    }); });
    router.post('/customer/update', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, params, customer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
                    params = {};
                    if (req.body.name) {
                        params.name = http_1.HttpParamValidators.MustBeString(req.body, "name", 2);
                    }
                    if (req.body.username) {
                        params.username = http_1.HttpParamValidators.MustBeString(req.body, 'username', 2);
                    }
                    if (req.body.birthday) {
                        params.birthday = http_1.HttpParamValidators.MustBeString(req.body, 'birthday', 10);
                    }
                    if (req.body.cccd) {
                        params.cccd = http_1.HttpParamValidators.MustBeString(req.body, 'cccd', 8);
                    }
                    if (req.body.role) {
                        params.role = http_1.HttpParamValidators.MustBeOneOf(req.body, "role", role_type);
                    }
                    if (req.body.phone) {
                        params.phone = http_1.HttpParamValidators.CheckPhone(req.body, 'phone', 10);
                    }
                    return [4 /*yield*/, bll.UpdateCustomer(id, params)];
                case 1:
                    customer = _a.sent();
                    res.json(customer);
                    return [2 /*return*/];
            }
        });
    }); });
    router.post('/customer/delete', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
                    return [4 /*yield*/, bll.DeleteCustomer(id)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, auth_bll.RemovePassword(id)];
                case 2:
                    _a.sent();
                    res.json(1);
                    return [2 /*return*/];
            }
        });
    }); });
    return router;
}
exports.NewCustomerAPI = NewCustomerAPI;
