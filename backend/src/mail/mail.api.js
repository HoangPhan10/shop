"use strict";
exports.__esModule = true;
exports.NewMailAPI = void 0;
var express = require("express");
var nodemailer = require("nodemailer");
function NewMailAPI() {
    var router = express.Router();
    router.post('/mail/send', function (req, res) {
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'acccountShopHaTrung@gmail.com',
                pass: 'shophatrung123'
            }
        });
        var option = {
            from: "".concat(req.body.name, "<acccountShopHaTrung@gmail.com>"),
            to: req.body.to,
            subject: req.body.title,
            text: req.body.content
        };
        transporter.sendMail(option, function (err, info) {
            if (err) {
                throw err;
            }
            else {
                console.log('done');
            }
        });
        res.json('Your mail has been sent successfully');
    });
    return router;
}
exports.NewMailAPI = NewMailAPI;
