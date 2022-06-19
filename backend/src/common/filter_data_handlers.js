"use strict";
exports.__esModule = true;
exports.FilterData = void 0;
exports.FilterData = {
    One: function (obj) {
        return "dtime" in obj ? null : obj;
    },
    Many: function (array) {
        var data = array.filter(function (el) { return !el.hasOwnProperty("dtime"); });
        return data;
    }
};
