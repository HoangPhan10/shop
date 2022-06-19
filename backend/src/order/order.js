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
exports.__esModule = true;
exports.OrderNS = void 0;
var rand_1 = require("../lib/rand");
var date_fns_1 = require("date-fns");
var OrderNS;
(function (OrderNS) {
    var OrderStatus;
    (function (OrderStatus) {
        OrderStatus["NEW"] = "new";
        OrderStatus["DELETE"] = "delete";
        OrderStatus["WAIT"] = "await";
        OrderStatus["DONE"] = "done";
        OrderStatus["CANCLE"] = "cancel";
    })(OrderStatus = OrderNS.OrderStatus || (OrderNS.OrderStatus = {}));
    var QueryReport;
    (function (QueryReport) {
        QueryReport["DAY"] = "day";
        QueryReport["WEEK"] = "week";
    })(QueryReport = OrderNS.QueryReport || (OrderNS.QueryReport = {}));
    OrderNS.Errors = {
        OrderNotFound: new Error("Order not found"),
        OrderExist: new Error("Order does exist"),
        ItemNotFound: new Error("Item not found"),
        ItemExists: new Error("Item does exist")
    };
    OrderNS.Generator = {
        NewOrderID: function () { return rand_1["default"].alphabet(12); },
        NewOrderCode: function () { return (0, date_fns_1.format)(Date.now(), "yyMMddhhmmss"); },
        NewItemID: function () { return rand_1["default"].alphabet(12); }
    };
    OrderNS.Utils = {
        TotalMoneyByDay: function (viewOrder) {
            var sum = viewOrder.reduce(function (init, curr) {
                return init + curr.total;
            }, 0);
            return sum;
        },
        FilterOrder: function (viewOrder) {
            var newArr = viewOrder.map(function (el) {
                return __assign(__assign({}, el), { day: new Date(el.mtime).toDateString().split(' ')[0] });
            });
            return newArr;
        },
        FilterReport: function (viewArr) {
            var MonArr = viewArr.filter(function (el) { return el.day === "Mon"; });
            var TueArr = viewArr.filter(function (el) { return el.day === "Tue"; });
            var WedArr = viewArr.filter(function (el) { return el.day === "Wed"; });
            var ThuArr = viewArr.filter(function (el) { return el.day === "Thu"; });
            var FriArr = viewArr.filter(function (el) { return el.day === "Fri"; });
            var SatArr = viewArr.filter(function (el) { return el.day === "Sat"; });
            var SunArr = viewArr.filter(function (el) { return el.day === "Sun"; });
            return [
                { amount: MonArr.length, total: OrderNS.Utils.TotalMoneyByDay(MonArr), day: "Mon" },
                { amount: TueArr.length, total: OrderNS.Utils.TotalMoneyByDay(TueArr), day: "Tue" },
                { amount: WedArr.length, total: OrderNS.Utils.TotalMoneyByDay(WedArr), day: "Wed" },
                { amount: ThuArr.length, total: OrderNS.Utils.TotalMoneyByDay(ThuArr), day: "Thur" },
                { amount: FriArr.length, total: OrderNS.Utils.TotalMoneyByDay(FriArr), day: "Fri" },
                { amount: SatArr.length, total: OrderNS.Utils.TotalMoneyByDay(SatArr), day: "Sat" },
                { amount: SunArr.length, total: OrderNS.Utils.TotalMoneyByDay(SunArr), day: "Sun" }
            ];
        }
    };
})(OrderNS = exports.OrderNS || (exports.OrderNS = {}));
