"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogParser = void 0;
const fs_1 = __importDefault(require("fs"));
class LogParser {
    Constructor() {
        // Default Constructor
    }
    getDataFromLogFile(filepath) {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(filepath, { encoding: 'utf-8' }, (err, data) => {
                if (err)
                    reject(null);
                resolve(data);
            });
        });
    }
    getLogTime(text) {
        return text.slice(0, 24);
    }
    getLogType(text) {
        return text.slice(24).split("-", 2)[1];
    }
    createErrorLog(timestamp, loglevel, transactionId, err) {
        return {
            timestamp: timestamp,
            loglevel: loglevel,
            transactionId: transactionId,
            err: err
        };
    }
    parseErrors(text) {
        let errors = [];
        const lines = text.split("\n");
        for (let i = 0; i < lines.length; i++) {
            const logtype = this.getLogType(lines[i]);
            if (logtype === 'warn' || logtype === 'error') {
                const logtime = this.getLogTime(lines[i]);
                const details = JSON.parse(lines[i].slice(logtime.length + logtype.length + 2));
                const timestamp = new Date(logtime).getTime();
                const transactionId = details.transactionId;
                const err = details.err;
                errors.push(this.createErrorLog(timestamp, logtype, transactionId, err));
            }
        }
        return errors;
    }
}
exports.LogParser = LogParser;
