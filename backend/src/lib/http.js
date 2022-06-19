"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.HttpParamValidators = exports.HttpBadRequest = exports.HttpNotFound = exports.HttpError = void 0;
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    function HttpError(message, __httpStatusCode) {
        var _this = _super.call(this, message) || this;
        _this.__httpStatusCode = __httpStatusCode;
        return _this;
    }
    HttpError.prototype.HttpStatusCode = function () {
        return this.__httpStatusCode;
    };
    return HttpError;
}(Error));
exports.HttpError = HttpError;
function HttpNotFound(msg) {
    if (msg === void 0) { msg = 'not found'; }
    return new HttpError(msg, 404 /* NotFound */);
}
exports.HttpNotFound = HttpNotFound;
function HttpBadRequest(msg) {
    if (msg === void 0) { msg = 'bad input'; }
    return new HttpError(msg, 400 /* BadRequest */);
}
exports.HttpBadRequest = HttpBadRequest;
exports.HttpParamValidators = {
    MustBeString: function (obj, key, min, max) {
        if (min === void 0) { min = 1; }
        if (max === void 0) { max = 512; }
        var v = obj[key];
        if (typeof v !== 'string') {
            throw HttpBadRequest("".concat(key, " must be string"));
        }
        if (v.length < min) {
            throw HttpBadRequest("".concat(key, " must be at least ").concat(min, " characters"));
        }
        if (v.length > max) {
            throw HttpBadRequest("".concat(key, " must be shorter than ").concat(max, " characters"));
        }
        return v;
    },
    MustBeArrayString: function (obj, key) {
        var v = obj[key];
        if (typeof v !== 'object') {
            throw HttpBadRequest("".concat(key, " must be array"));
        }
        v.some(function (el) {
            if (typeof el !== 'string') {
                throw HttpBadRequest("".concat(el, " must be string"));
            }
        });
        return v;
    },
    MustBeNumber: function (obj, key, min, max) {
        if (min === void 0) { min = 1; }
        if (max === void 0) { max = 512; }
        var v = obj[key];
        if (typeof v !== 'number') {
            throw HttpBadRequest("".concat(key, " must be number"));
        }
        // return positive number
        return +v;
    },
    CheckPhone: function (obj, key, min, max) {
        if (min === void 0) { min = 1; }
        if (max === void 0) { max = 512; }
        var v = obj[key];
        if (typeof v !== 'string') {
            throw HttpBadRequest("".concat(key, " must be string"));
        }
        if (v.length < min) {
            throw HttpBadRequest("".concat(key, " must be at least ").concat(min, " characters"));
        }
        if (v.length > max) {
            throw HttpBadRequest("".concat(key, " must be shorter than ").concat(max, " characters"));
        }
        if (!Number.isInteger(+v)) {
            throw HttpBadRequest("".concat(key, " can't contain chacacter"));
        }
        return v;
    },
    MustBeOneOf: function (obj, key, values) {
        if (values === void 0) { values = []; }
        var value = obj[key];
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var v = values_1[_i];
            if (v === value) {
                return v;
            }
        }
        throw HttpBadRequest("".concat(key, " must be one of ").concat(values.join(',')));
    }
};
