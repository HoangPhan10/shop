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
exports.ExpressStaticFallback = void 0;
var Layer = require('express/lib/router/layer');
function isAsyncFunction(value) {
    return value[Symbol.toStringTag] === 'AsyncFunction';
}
Layer.prototype.handle_request = function handle(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var fn, _a, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fn = this.handle;
                    _a = fn.length;
                    switch (_a) {
                        case 0: return [3 /*break*/, 1];
                        case 1: return [3 /*break*/, 2];
                        case 2: return [3 /*break*/, 3];
                        case 3: return [3 /*break*/, 9];
                    }
                    return [3 /*break*/, 10];
                case 1:
                    next();
                    return [3 /*break*/, 11];
                case 2:
                    next();
                    return [3 /*break*/, 11];
                case 3:
                    _b.trys.push([3, 7, , 8]);
                    if (!isAsyncFunction(fn)) return [3 /*break*/, 5];
                    return [4 /*yield*/, fn(req, res)];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    fn(req, res);
                    _b.label = 6;
                case 6:
                    if (!res.headersSent) {
                        next();
                    }
                    return [3 /*break*/, 8];
                case 7:
                    err_1 = _b.sent();
                    next(err_1);
                    return [3 /*break*/, 8];
                case 8: return [3 /*break*/, 11];
                case 9:
                    // (req, res, next) => {}
                    fn(req, res, next);
                    return [3 /*break*/, 11];
                case 10:
                    next();
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
};
var express = require("express");
var path = require("path");
var fs = require("fs");
function ExpressStaticFallback(folder) {
    var handler = express.static(folder);
    var defaultHandler = function (req, res) {
        res.status(404 /* NotFound */).end("not found");
    };
    var indexFile = path.join(folder, "index.html");
    if (fs.existsSync(indexFile)) {
        defaultHandler = function (req, res) {
            res.sendFile(indexFile);
        };
    }
    return function (req, res, next) {
        var ext = path.extname(req.url);
        if (ext) {
            handler(req, res, next);
        }
        else {
            defaultHandler(req, res);
        }
    };
}
exports.ExpressStaticFallback = ExpressStaticFallback;
