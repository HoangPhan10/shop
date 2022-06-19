"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
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
exports.MongoCommon = exports.FromMongoData = exports.ToMongoData = exports.MongoError = exports.MongoDB = void 0;
var mongodb_1 = require("mongodb");
var mongodb_2 = require("mongodb");
__createBinding(exports, mongodb_2, "Db", "MongoDB");
__createBinding(exports, mongodb_2, "MongoError");
function RenameOne(doc, from, to) {
    if (!doc) {
        return null;
    }
    var obj = {};
    for (var _i = 0, _a = Object.entries(doc); _i < _a.length; _i++) {
        var _b = _a[_i], k = _b[0], v = _b[1];
        if (k === from) {
            obj[to] = v;
        }
        else {
            obj[k] = v;
        }
    }
    return obj;
}
function RenameArray(docs, from, to) {
    if (!docs) {
        return [];
    }
    var res = [];
    for (var _i = 0, docs_1 = docs; _i < docs_1.length; _i++) {
        var d = docs_1[_i];
        res.push(RenameOne(d, from, to));
    }
    return res;
}
exports.ToMongoData = {
    Many: function (docs) {
        return RenameArray(docs, 'id', '_id');
    },
    One: function (doc) {
        return RenameOne(doc, 'id', '_id');
    }
};
exports.FromMongoData = {
    Many: function (docs) {
        return RenameArray(docs, '_id', 'id');
    },
    One: function (doc) {
        return RenameOne(doc, '_id', 'id');
    }
};
function Connect(url) {
    return __awaiter(this, void 0, void 0, function () {
        var client;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new mongodb_1.MongoClient(url);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, client];
            }
        });
    });
}
var sessionSymbol = Symbol('session');
exports.MongoCommon = {
    Connect: Connect,
    WithSession: function (ctx, session) {
        ctx[sessionSymbol] = session;
        return ctx;
    },
    Session: function (ctx) {
        return ctx[sessionSymbol];
    }
};
