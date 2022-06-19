"use strict";
exports.__esModule = true;
var CHARSET = {
    UPSERCASE: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    ALPHABET: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    NUMBER: '0123456789'
};
function randomString(length, chars) {
    var result = [];
    var len = chars.length;
    for (var i = length; i > 0; --i) {
        result[i] = chars[Math.floor(Math.random() * len)];
    }
    return result.join('');
}
var uppercase = function (l) {
    if (l === void 0) { l = 8; }
    return randomString(l, CHARSET.UPSERCASE);
};
var alphabet = function (l) {
    if (l === void 0) { l = 8; }
    return randomString(l, CHARSET.ALPHABET);
};
var number = function (l) {
    if (l === void 0) { l = 8; }
    return randomString(l, CHARSET.NUMBER);
};
exports["default"] = {
    uppercase: uppercase,
    alphabet: alphabet,
    number: number
};
