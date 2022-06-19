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
exports.ProductMongoDAL = void 0;
var mongodb_1 = require("../lib/mongodb");
var ProductMongoDAL = /** @class */ (function () {
    function ProductMongoDAL(db) {
        this.db = db;
        this.col_comment = this.db.collection("comment");
        this.col_product = this.db.collection("product");
    }
    ProductMongoDAL.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    ProductMongoDAL.prototype.ListComment = function (product_id) {
        return __awaiter(this, void 0, void 0, function () {
            var comments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.col_comment.find({ product_id: product_id }).toArray()];
                    case 1:
                        comments = _a.sent();
                        return [2 /*return*/, mongodb_1.FromMongoData.Many(comments)];
                }
            });
        });
    };
    ProductMongoDAL.prototype.GetComment = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.col_comment.findOne({ _id: id })];
                    case 1:
                        comment = _a.sent();
                        return [2 /*return*/, mongodb_1.FromMongoData.One(comment)];
                }
            });
        });
    };
    ProductMongoDAL.prototype.CreateComment = function (comment) {
        return __awaiter(this, void 0, void 0, function () {
            var doc, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doc = mongodb_1.ToMongoData.One(comment);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.col_comment.insertOne(doc)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductMongoDAL.prototype.ListProduct = function (gender) {
        return __awaiter(this, void 0, void 0, function () {
            var products_1, products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!gender) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.col_product.find({ gender: gender }).toArray()];
                    case 1:
                        products_1 = _a.sent();
                        return [2 /*return*/, mongodb_1.FromMongoData.Many(products_1)];
                    case 2: return [4 /*yield*/, this.col_product.find().toArray()];
                    case 3:
                        products = _a.sent();
                        return [2 /*return*/, mongodb_1.FromMongoData.Many(products)];
                }
            });
        });
    };
    ProductMongoDAL.prototype.GetProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.col_product.findOne({ _id: id })];
                    case 1:
                        product = _a.sent();
                        return [2 /*return*/, mongodb_1.FromMongoData.One(product)];
                }
            });
        });
    };
    ProductMongoDAL.prototype.GetProductByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.col_product.find({ "name": { $regex: name } }).toArray()];
                    case 1:
                        products = _a.sent();
                        return [2 /*return*/, mongodb_1.FromMongoData.Many(products)];
                }
            });
        });
    };
    ProductMongoDAL.prototype.CreateProduct = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var doc, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doc = mongodb_1.ToMongoData.One(product);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.col_product.insertOne(doc)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductMongoDAL.prototype.UpdateProduct = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var doc, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doc = mongodb_1.ToMongoData.One(product);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.col_product.updateOne({ _id: product.id }, { $set: doc })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ProductMongoDAL;
}());
exports.ProductMongoDAL = ProductMongoDAL;
