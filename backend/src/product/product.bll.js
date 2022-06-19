"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.NewProductBLLBase = void 0;
var filter_data_handlers_1 = require("../common/filter_data_handlers");
var product_1 = require("./product");
var NewProductBLLBase = /** @class */ (function () {
    function NewProductBLLBase(dal, orderDAL) {
        this.dal = dal;
        this.orderDAL = orderDAL;
    }
    NewProductBLLBase.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    NewProductBLLBase.prototype.ListComment = function (product_id) {
        return __awaiter(this, void 0, void 0, function () {
            var comments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dal.ListComment(product_id)];
                    case 1:
                        comments = _a.sent();
                        if (filter_data_handlers_1.FilterData.Many(comments).length == 0) {
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/, comments];
                }
            });
        });
    };
    NewProductBLLBase.prototype.GetComment = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dal.GetComment(id)];
                    case 1:
                        comment = _a.sent();
                        if (!comment || !filter_data_handlers_1.FilterData.One(comment)) {
                            throw product_1.ProductNS.Errors.CommentNotFound;
                        }
                        return [2 /*return*/, comment];
                }
            });
        });
    };
    NewProductBLLBase.prototype.CreateComment = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doc = __assign(__assign({ id: product_1.ProductNS.Generator.NewCommentID() }, params), { ctime: Date.now(), mtime: Date.now() });
                        return [4 /*yield*/, this.dal.CreateComment(doc)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, doc];
                }
            });
        });
    };
    NewProductBLLBase.prototype.GetProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var product, comments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dal.GetProduct(id)];
                    case 1:
                        product = _a.sent();
                        if (!product || !filter_data_handlers_1.FilterData.One(product)) {
                            throw product_1.ProductNS.Errors.ProductNotFound;
                        }
                        return [4 /*yield*/, this.ListComment(product.id)];
                    case 2:
                        comments = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, product), { comments: comments })];
                }
            });
        });
    };
    NewProductBLLBase.prototype.GetProductByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var products, viewProductArr, _i, _a, p, comments, product;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.dal.GetProductByName(name)];
                    case 1:
                        products = _b.sent();
                        if (filter_data_handlers_1.FilterData.Many(products).length == 0) {
                            throw product_1.ProductNS.Errors.ProductNotFound;
                        }
                        viewProductArr = [];
                        _i = 0, _a = filter_data_handlers_1.FilterData.Many(products);
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        p = _a[_i];
                        return [4 /*yield*/, this.ListComment(p.id)];
                    case 3:
                        comments = _b.sent();
                        product = __assign(__assign({}, p), { comments: comments });
                        viewProductArr.push(product);
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, viewProductArr];
                }
            });
        });
    };
    NewProductBLLBase.prototype.GetProductByOrder = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var product, comments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dal.GetProduct(id)];
                    case 1:
                        product = _a.sent();
                        return [4 /*yield*/, this.ListComment(product.id)];
                    case 2:
                        comments = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, product), { comments: comments })];
                }
            });
        });
    };
    NewProductBLLBase.prototype.ListProduct = function (gender) {
        return __awaiter(this, void 0, void 0, function () {
            var viewProduct_1, products_1, _i, _a, p, product, viewProduct, products, _b, _c, p, product;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!gender) return [3 /*break*/, 6];
                        viewProduct_1 = [];
                        return [4 /*yield*/, this.dal.ListProduct(gender)];
                    case 1:
                        products_1 = _d.sent();
                        _i = 0, _a = filter_data_handlers_1.FilterData.Many(products_1);
                        _d.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        p = _a[_i];
                        return [4 /*yield*/, this.GetProduct(p.id)];
                    case 3:
                        product = _d.sent();
                        viewProduct_1.push(product);
                        _d.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, viewProduct_1];
                    case 6:
                        viewProduct = [];
                        return [4 /*yield*/, this.dal.ListProduct()];
                    case 7:
                        products = _d.sent();
                        _b = 0, _c = filter_data_handlers_1.FilterData.Many(products);
                        _d.label = 8;
                    case 8:
                        if (!(_b < _c.length)) return [3 /*break*/, 11];
                        p = _c[_b];
                        return [4 /*yield*/, this.GetProduct(p.id)];
                    case 9:
                        product = _d.sent();
                        viewProduct.push(product);
                        _d.label = 10;
                    case 10:
                        _b++;
                        return [3 /*break*/, 8];
                    case 11: return [2 /*return*/, viewProduct];
                }
            });
        });
    };
    NewProductBLLBase.prototype.ListProductSales = function () {
        return __awaiter(this, void 0, void 0, function () {
            var viewProduct, products, filterProducts, _i, filterProducts_1, p, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        viewProduct = [];
                        return [4 /*yield*/, this.dal.ListProduct()];
                    case 1:
                        products = _a.sent();
                        filterProducts = filter_data_handlers_1.FilterData.Many(products).filter(function (el) { return el.origin_price !== el.price; });
                        _i = 0, filterProducts_1 = filterProducts;
                        _a.label = 2;
                    case 2:
                        if (!(_i < filterProducts_1.length)) return [3 /*break*/, 5];
                        p = filterProducts_1[_i];
                        return [4 /*yield*/, this.GetProduct(p.id)];
                    case 3:
                        product = _a.sent();
                        viewProduct.push(product);
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, viewProduct];
                }
            });
        });
    };
    NewProductBLLBase.prototype.CreateProduct = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doc = __assign(__assign({ id: product_1.ProductNS.Generator.NewProductID(), code: product_1.ProductNS.Generator.NewProductCode() }, params), { consume: 0, ctime: Date.now(), mtime: Date.now() });
                        return [4 /*yield*/, this.dal.CreateProduct(doc)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, doc];
                }
            });
        });
    };
    NewProductBLLBase.prototype.UpdateProduct = function (id, params) {
        return __awaiter(this, void 0, void 0, function () {
            var product, comments, doc, items, _i, items_1, i, order, newOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dal.GetProduct(id)];
                    case 1:
                        product = _a.sent();
                        if (!product || !filter_data_handlers_1.FilterData.One(product)) {
                            throw product_1.ProductNS.Errors.ProductNotFound;
                        }
                        return [4 /*yield*/, this.ListComment(product.id)];
                    case 2:
                        comments = _a.sent();
                        doc = __assign(__assign(__assign({}, product), params), { mtime: Date.now() });
                        if (params.image) {
                            doc.image = params.image;
                        }
                        if (!params.price) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.orderDAL.ListItem(product.id)];
                    case 3:
                        items = _a.sent();
                        _i = 0, items_1 = items;
                        _a.label = 4;
                    case 4:
                        if (!(_i < items_1.length)) return [3 /*break*/, 8];
                        i = items_1[_i];
                        return [4 /*yield*/, this.orderDAL.GetOrder(i.order_id)];
                    case 5:
                        order = _a.sent();
                        newOrder = __assign(__assign({}, order), { total: i.amount * params.price });
                        return [4 /*yield*/, this.orderDAL.UpdateOrder(newOrder)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 4];
                    case 8: return [4 /*yield*/, this.dal.UpdateProduct(doc)];
                    case 9:
                        _a.sent();
                        return [2 /*return*/, __assign(__assign({}, doc), { comments: comments })];
                }
            });
        });
    };
    NewProductBLLBase.prototype.DeleteProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var product, comments, doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dal.GetProduct(id)];
                    case 1:
                        product = _a.sent();
                        if (!product || !filter_data_handlers_1.FilterData.One(product)) {
                            throw product_1.ProductNS.Errors.ProductNotFound;
                        }
                        return [4 /*yield*/, this.ListComment(product.id)];
                    case 2:
                        comments = _a.sent();
                        doc = __assign(__assign({}, product), { dtime: Date.now() });
                        return [4 /*yield*/, this.dal.UpdateProduct(doc)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, __assign(__assign({}, doc), { comments: comments })];
                }
            });
        });
    };
    return NewProductBLLBase;
}());
exports.NewProductBLLBase = NewProductBLLBase;
