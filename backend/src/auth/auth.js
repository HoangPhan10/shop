"use strict";
exports.__esModule = true;
exports.CustomerAuthNS = void 0;
var CustomerAuthNS;
(function (CustomerAuthNS) {
    CustomerAuthNS.Errors = {
        ErrCustomerHasNoLogin: new Error("customer has no login"),
        ErrWrongPassword: new Error("wrong password"),
        ErrAllowAccess: new Error("customer role not allow full access")
    };
})(CustomerAuthNS = exports.CustomerAuthNS || (exports.CustomerAuthNS = {}));
