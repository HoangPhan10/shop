"use strict";
exports.__esModule = true;
exports.CustomerNS = void 0;
var rand_1 = require("../lib/rand");
var CustomerNS;
(function (CustomerNS) {
    var Role;
    (function (Role) {
        Role["ADMIN"] = "admin";
        Role["CUSTOMER"] = "customer";
        Role["STAFF"] = "staff";
    })(Role = CustomerNS.Role || (CustomerNS.Role = {}));
    CustomerNS.Errors = {
        CustomerNotFound: new Error("Customer not found"),
        CustomerExists: new Error("Customer already exists")
    };
    CustomerNS.Generator = {
        NewCustomerID: function () { return rand_1["default"].alphabet(8); }
    };
})(CustomerNS = exports.CustomerNS || (exports.CustomerNS = {}));
