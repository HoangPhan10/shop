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
exports.CustomerAuthDALMongo = void 0;
var mongodb_1 = require("../lib/mongodb");
var CustomerAuthDALMongo = /** @class */ (function () {
    function CustomerAuthDALMongo(db) {
        this.db = db;
        this.col_customer_secret = this.db.collection("customer_secret");
        this.col_customer_session = this.db.collection("customer_session");
    }
    CustomerAuthDALMongo.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    CustomerAuthDALMongo.prototype.SaveCustomerSecret = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.col_customer_secret.updateOne({
                            customer_id: obj.customer_id,
                            name: obj.name
                        }, {
                            $set: {
                                customer_id: obj.customer_id,
                                name: obj.name,
                                value: obj.value
                            }
                        }, { upsert: true })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CustomerAuthDALMongo.prototype.GetCustomerSecret = function (customer_id, name) {
        return __awaiter(this, void 0, void 0, function () {
            var doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.col_customer_secret.findOne({ customer_id: customer_id, name: name })];
                    case 1:
                        doc = _a.sent();
                        return [2 /*return*/, mongodb_1.FromMongoData.One(doc)];
                }
            });
        });
    };
    CustomerAuthDALMongo.prototype.CreateCustomerSession = function (session) {
        return __awaiter(this, void 0, void 0, function () {
            var doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doc = mongodb_1.ToMongoData.One(session);
                        return [4 /*yield*/, this.col_customer_session.insertOne(doc)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CustomerAuthDALMongo.prototype.GetCustomerSession = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.col_customer_session.findOne({ _id: id })];
                    case 1:
                        doc = _a.sent();
                        return [2 /*return*/, mongodb_1.FromMongoData.One(doc)];
                }
            });
        });
    };
    CustomerAuthDALMongo.prototype.GetSessionByCustomer = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var docs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.col_customer_session.find({ user_id: user_id }).toArray()];
                    case 1:
                        docs = _a.sent();
                        return [2 /*return*/, mongodb_1.FromMongoData.Many(docs)];
                }
            });
        });
    };
    CustomerAuthDALMongo.prototype.DisableSession = function (session) {
        return __awaiter(this, void 0, void 0, function () {
            var doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doc = mongodb_1.ToMongoData.One(session);
                        return [4 /*yield*/, this.col_customer_session.updateOne({ _id: session.id }, { $set: doc })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CustomerAuthDALMongo.prototype.RemovePassword = function (customer_id) {
        return __awaiter(this, void 0, void 0, function () {
            var secret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.col_customer_secret.findOne({ customer_id: customer_id })];
                    case 1:
                        secret = _a.sent();
                        return [4 /*yield*/, this.col_customer_secret.deleteOne({ _id: secret._id })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CustomerAuthDALMongo;
}());
exports.CustomerAuthDALMongo = CustomerAuthDALMongo;
