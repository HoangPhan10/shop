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
exports.OrderMongoDAL = void 0;
var order_1 = require("./order");
var mongodb_1 = require("../lib/mongodb");
var filter_data_handlers_1 = require("../common/filter_data_handlers");
var date_fns_1 = require("date-fns");
var OrderMongoDAL = /** @class */ (function () {
    function OrderMongoDAL(db) {
        this.db = db;
        this.col_order = this.db.collection("order");
        this.col_item = this.db.collection("item");
    }
    OrderMongoDAL.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    OrderMongoDAL.prototype.ListItem = function (product_id) {
        return __awaiter(this, void 0, void 0, function () {
            var items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.col_item
                            .find({ product_id: product_id })
                            .toArray()];
                    case 1:
                        items = _a.sent();
                        return [2 /*return*/, filter_data_handlers_1.FilterData.Many(mongodb_1.FromMongoData.Many(items))];
                }
            });
        });
    };
    OrderMongoDAL.prototype.GetItem = function (order_id) {
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.col_item.findOne({ order_id: order_id })];
                    case 1:
                        item = _a.sent();
                        return [2 /*return*/, mongodb_1.FromMongoData.One(item)];
                }
            });
        });
    };
    OrderMongoDAL.prototype.CreateItem = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var doc, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doc = mongodb_1.ToMongoData.One(item);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.col_item.insertOne(doc)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        if (error_1.code === 11000 /* Duplicate */) {
                            throw order_1.OrderNS.Errors.ItemExists;
                        }
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderMongoDAL.prototype.UpdateItem = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var doc, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doc = mongodb_1.ToMongoData.One(item);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.col_item.updateOne({ _id: item.id }, { $set: doc })];
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
    OrderMongoDAL.prototype.ListOrder = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = {};
                        if (query.status) {
                            filter.status = query.status;
                        }
                        if (query.customer_id) {
                            filter.customer_id = query.customer_id;
                        }
                        return [4 /*yield*/, this.col_order
                                .find(filter)
                                .toArray()];
                    case 1:
                        orders = _a.sent();
                        return [2 /*return*/, mongodb_1.FromMongoData.Many(orders)];
                }
            });
        });
    };
    OrderMongoDAL.prototype.GetOrder = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.col_order.findOne({ _id: id })];
                    case 1:
                        order = _a.sent();
                        return [2 /*return*/, mongodb_1.FromMongoData.One(order)];
                }
            });
        });
    };
    OrderMongoDAL.prototype.CreateOrder = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var doc, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doc = mongodb_1.ToMongoData.One(order);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.col_order.insertOne(doc)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        if (error_3.code === 11000 /* Duplicate */) {
                            throw order_1.OrderNS.Errors.OrderExist;
                        }
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderMongoDAL.prototype.UpdateOrder = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var doc, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doc = mongodb_1.ToMongoData.One(order);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.col_order.updateOne({ _id: order.id }, { $set: doc })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        throw error_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderMongoDAL.prototype.ListOrderByReport = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var start, end, orders, start, end, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(query === order_1.OrderNS.QueryReport.WEEK)) return [3 /*break*/, 2];
                        start = (0, date_fns_1.startOfWeek)(Date.now()).getTime();
                        end = (0, date_fns_1.endOfWeek)(Date.now()).getTime();
                        return [4 /*yield*/, this.col_order.find({ status: order_1.OrderNS.OrderStatus.DONE, mtime: { $gte: start, $lte: end } }).toArray()];
                    case 1:
                        orders = _a.sent();
                        return [2 /*return*/, mongodb_1.FromMongoData.Many(orders)];
                    case 2:
                        if (!(query === order_1.OrderNS.QueryReport.DAY)) return [3 /*break*/, 4];
                        start = (0, date_fns_1.startOfDay)(Date.now()).getTime();
                        end = (0, date_fns_1.endOfDay)(Date.now()).getTime();
                        return [4 /*yield*/, this.col_order.find({ status: order_1.OrderNS.OrderStatus.DONE, mtime: { $gte: start, $lte: end } }).toArray()];
                    case 3:
                        orders = _a.sent();
                        return [2 /*return*/, mongodb_1.FromMongoData.Many(orders)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OrderMongoDAL;
}());
exports.OrderMongoDAL = OrderMongoDAL;
