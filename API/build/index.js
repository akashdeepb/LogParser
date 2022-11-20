"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const LogParser_1 = require("./LogParser");
const app = (0, express_1.default)();
const upload = (0, multer_1.default)({ dest: './uploads/' });
app.use((0, cors_1.default)());
const port = process.env.PORT || 3001;
app.use('/upload', upload.single('logfile'), (req, res) => {
    var _a;
    const filename = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const filepath = path_1.default.resolve('./uploads/' + filename);
    const logParser = new LogParser_1.LogParser();
    logParser.getDataFromLogFile(filepath)
        .then(data => {
        console.log(data);
        const errors = logParser.parseErrors(data);
        res.status(200).json({ errors });
    })
        .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Error Parsing File" });
    });
});
app.listen(port, () => {
    console.log(`Backend for Beanstalk Assignment running @${port}`);
});
