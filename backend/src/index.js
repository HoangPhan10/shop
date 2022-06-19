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
var config_1 = require("./config");
var express = require("express");
var cors = require("cors");
require("./lib/express");
require("./ext/log");
var express_1 = require("./lib/express");
var http_errror_handler_1 = require("./common/http_errror_handler");
var mongodb_1 = require("./lib/mongodb");
// import { ContextBLLBase } from "./ext/ctx.bll";
var product_api_1 = require("./product/product.api");
var product_bll_1 = require("./product/product.bll");
var product_dal_1 = require("./product/product.dal");
var order_api_1 = require("./order/order.api");
var order_bll_1 = require("./order/order.bll");
var order_dal_1 = require("./order/order.dal");
var customer_api_1 = require("./customer/customer.api");
var customer_bll_1 = require("./customer/customer.bll");
var customer_dal_1 = require("./customer/customer.dal");
var auth_api_1 = require("./auth/auth.api");
var auth_bll_base_1 = require("./auth/auth.bll.base");
var auth_dal_mongo_1 = require("./auth/auth.dal.mongo");
var mail_api_1 = require("./mail/mail.api");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var config, client, db, productDAL, orderDAL, productBLL, orderBLL, customerDAL, customerBLL, authDAL, authBLL, app;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, config_1.ReadConfig)()];
                case 1:
                    config = _a.sent();
                    console.log(config);
                    return [4 /*yield*/, mongodb_1.MongoCommon.Connect(config.database.db_url)];
                case 2:
                    client = _a.sent();
                    console.log("Connect to database");
                    db = client.db(config.database.db_name);
                    productDAL = new product_dal_1.ProductMongoDAL(db);
                    productDAL.init();
                    orderDAL = new order_dal_1.OrderMongoDAL(db);
                    orderDAL.init();
                    productBLL = new product_bll_1.NewProductBLLBase(productDAL, orderDAL);
                    productBLL.init();
                    orderBLL = new order_bll_1.NewOrderBLLBase(orderDAL, productBLL);
                    orderBLL.init();
                    customerDAL = new customer_dal_1.CustomerMongoDAL(db);
                    customerDAL.init();
                    customerBLL = new customer_bll_1.NewCustomerBLLBase(customerDAL);
                    customerBLL.init();
                    authDAL = new auth_dal_mongo_1.CustomerAuthDALMongo(db);
                    authDAL.init();
                    authBLL = new auth_bll_base_1.CustomerAuthBLLBase(authDAL, customerBLL);
                    authBLL.init();
                    app = express();
                    app.use(express.json());
                    app.disable("x-powered-by");
                    app.use(cors());
                    /*******************************************************/
                    app.use("/api/customer", (0, customer_api_1.NewCustomerAPI)(customerBLL, authBLL));
                    app.use("/api/product", (0, product_api_1.NewProductAPI)(productBLL));
                    app.use("/api/order", (0, order_api_1.NewOrderAPI)(orderBLL));
                    app.use("/api/auth", (0, auth_api_1.NewAuthAPI)(authBLL));
                    app.use("/api/mail", (0, mail_api_1.NewMailAPI)());
                    /*******************************************************/
                    app.use("/", (0, express_1.ExpressStaticFallback)(config.app.dir));
                    app.use(http_errror_handler_1.HttpErrorHandler);
                    console.log("listen on ".concat(config.server.port));
                    app.listen(config.server.port, "0.0.0.0", function () {
                        var err = arguments[0];
                        if (err) {
                            console.log(err);
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
main()["catch"](function (err) { return console.log(err); });
