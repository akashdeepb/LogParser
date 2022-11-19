"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LogParser_1 = require("./LogParser");
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const logEx = '2044-08-09T02:12:51.253Z-info-{"transactionId":"9abc55bcb2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}';
const errEx = '2044-08-09T02:12:51.253Z-info-{"transactionId":"9abc55bcb2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started","err":"Not Found"}';
app.use('/', (req, res) => {
    let logParser = new LogParser_1.LogParser();
    let result = logParser.parseErrors(errEx);
    res.status(200).json({ message: result });
});
app.listen(port, () => {
    console.log(`Backend for Beanstalk Assignment running @${port}`);
});
