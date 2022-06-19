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
exports.NewProductAPI = void 0;
var http_1 = require("../lib/http");
var product_1 = require("./product");
var express = require("express");
function NewProductAPI(bll) {
    var _this = this;
    var gender = Object.values(product_1.ProductNS.Gender);
    var router = express.Router();
    router.get("/product/list", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var gender_query, product_2, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!req.query.gender) return [3 /*break*/, 2];
                    gender_query = http_1.HttpParamValidators.MustBeOneOf(req.query, "gender", gender);
                    return [4 /*yield*/, bll.ListProduct(gender_query)];
                case 1:
                    product_2 = _a.sent();
                    return [2 /*return*/, res.json(product_2)];
                case 2: return [4 /*yield*/, bll.ListProduct()];
                case 3:
                    product = _a.sent();
                    return [2 /*return*/, res.json(product)];
            }
        });
    }); });
    router.get('/product/sale', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bll.ListProductSales()];
                case 1:
                    product = _a.sent();
                    return [2 /*return*/, res.json(product)];
            }
        });
    }); });
    router.get("/product/get", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
                    return [4 /*yield*/, bll.GetProduct(id)];
                case 1:
                    product = _a.sent();
                    res.json(product);
                    return [2 /*return*/];
            }
        });
    }); });
    router.get("/product/get_by_name", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var name, products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = http_1.HttpParamValidators.MustBeString(req.query, "name");
                    return [4 /*yield*/, bll.GetProductByName(name)];
                case 1:
                    products = _a.sent();
                    res.json(products);
                    return [2 /*return*/];
            }
        });
    }); });
    router.post("/product/create", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var params, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        name: http_1.HttpParamValidators.MustBeString(req.body, "name", 2),
                        material: http_1.HttpParamValidators.MustBeString(req.body, "material"),
                        image: http_1.HttpParamValidators.MustBeArrayString(req.body, "image"),
                        color: http_1.HttpParamValidators.MustBeString(req.body, "color"),
                        amount: http_1.HttpParamValidators.MustBeNumber(req.body, "amount"),
                        origin_price: http_1.HttpParamValidators.MustBeNumber(req.body, "origin_price"),
                        price: http_1.HttpParamValidators.MustBeNumber(req.body, "price"),
                        gender: http_1.HttpParamValidators.MustBeOneOf(req.body, "gender", gender)
                    };
                    return [4 /*yield*/, bll.CreateProduct(params)];
                case 1:
                    product = _a.sent();
                    res.json(product);
                    return [2 /*return*/];
            }
        });
    }); });
    router.post('/product/update', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, params, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
                    params = {};
                    if (req.body.name) {
                        params.name = http_1.HttpParamValidators.MustBeString(req.body, "name", 2);
                    }
                    if (req.body.material) {
                        params.material = http_1.HttpParamValidators.MustBeString(req.body, "material");
                    }
                    if (req.body.color) {
                        params.color = http_1.HttpParamValidators.MustBeString(req.body, "color");
                    }
                    if (req.body.amount) {
                        params.amount = http_1.HttpParamValidators.MustBeNumber(req.body, "amount");
                    }
                    if (req.body.origin_price) {
                        params.origin_price = http_1.HttpParamValidators.MustBeNumber(req.body, "origin_price");
                    }
                    if (req.body.price) {
                        params.price = http_1.HttpParamValidators.MustBeNumber(req.body, "price");
                    }
                    if (req.body.gender) {
                        params.gender = http_1.HttpParamValidators.MustBeOneOf(req.body, "gender", gender);
                    }
                    if (req.body.image) {
                        params.image = http_1.HttpParamValidators.MustBeArrayString(req.body, "image");
                    }
                    return [4 /*yield*/, bll.UpdateProduct(id, params)];
                case 1:
                    product = _a.sent();
                    res.json(product);
                    return [2 /*return*/];
            }
        });
    }); });
    router.post('/product/delete', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
                    return [4 /*yield*/, bll.DeleteProduct(id)];
                case 1:
                    product = _a.sent();
                    res.json(product);
                    return [2 /*return*/];
            }
        });
    }); });
    router.get('/comment/list', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var product_id, comments;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    product_id = http_1.HttpParamValidators.MustBeString(req.query, "product_id", 8);
                    return [4 /*yield*/, bll.ListComment(product_id)];
                case 1:
                    comments = _a.sent();
                    res.json(comments);
                    return [2 /*return*/];
            }
        });
    }); });
    router.get('/comment/get', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, comment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
                    return [4 /*yield*/, bll.GetComment(id)];
                case 1:
                    comment = _a.sent();
                    res.json(comment);
                    return [2 /*return*/];
            }
        });
    }); });
    router.post('/comment/create', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var params, comment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        product_id: http_1.HttpParamValidators.MustBeString(req.body, "product_id", 8),
                        customer_id: http_1.HttpParamValidators.MustBeString(req.body, "customer_id", 8),
                        username: http_1.HttpParamValidators.MustBeString(req.body, "username", 2),
                        comment: http_1.HttpParamValidators.MustBeString(req.body, "comment"),
                        rate: http_1.HttpParamValidators.MustBeNumber(req.body, "rate")
                    };
                    return [4 /*yield*/, bll.CreateComment(params)];
                case 1:
                    comment = _a.sent();
                    res.json(comment);
                    return [2 /*return*/];
            }
        });
    }); });
    return router;
}
exports.NewProductAPI = NewProductAPI;
