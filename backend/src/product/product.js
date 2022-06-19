"use strict";
exports.__esModule = true;
exports.ProductNS = void 0;
var rand_1 = require("../lib/rand");
var ProductNS;
(function (ProductNS) {
    // export enum SizeType{
    //     S="S",
    //     M="M",
    //     L="L",
    // }
    // export interface Size{
    //     id:string;
    //     product_id:string;
    //     size:SizeType;
    //     amount:number;
    //     ctime:number;
    //     mtime:number;
    // }
    var Gender;
    (function (Gender) {
        Gender["MEN"] = "men";
        Gender["WOMEN"] = "women";
        Gender["CHILD"] = "children";
    })(Gender = ProductNS.Gender || (ProductNS.Gender = {}));
    ProductNS.Errors = {
        ProductNotFound: new Error("product not found"),
        ProductExist: new Error("product already exist"),
        CommentNotFound: new Error("comment not found")
    };
    ProductNS.Generator = {
        NewProductID: function () { return rand_1["default"].alphabet(8); },
        NewProductCode: function () {
            return "Product".concat(rand_1["default"].number(4));
        },
        NewCommentID: function () { return rand_1["default"].alphabet(4); }
    };
})(ProductNS = exports.ProductNS || (exports.ProductNS = {}));
