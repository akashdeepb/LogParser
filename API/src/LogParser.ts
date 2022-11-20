import fs from 'fs';

export class LogParser {
    Constructor () {
        // Default Constructor
    }

    getDataFromLogFile(filepath: string) {
        return new Promise((resolve, reject) => {
            fs.readFile(filepath, { encoding: 'utf-8' }, (err, data) => {
                if(err) reject(null);
                resolve(data);
            });
        });
    }

    getLogTime(text: string) {
        return text.slice(0,24);
    }

    getLogType(text: string) {
        return text.slice(24).split("-", 2)[1];
    }

    createErrorLog(
        timestamp: number, 
        loglevel: string, 
        transactionId: string,
        err: string
    ) {
        return {
            timestamp: timestamp,
            loglevel: loglevel,
            transactionId: transactionId,
            err: err
        }
    }

    parseErrors(text: string) {
        let errors: Object[] = [];
        const lines = text.split("\n");
        for(let i=0;i<lines.length;i++) {
            const logtype = this.getLogType(lines[i]);
            if(logtype === 'warn' || logtype === 'error') {
                const logtime = this.getLogTime(lines[i]);
                const details = JSON.parse(lines[i].slice(logtime.length + logtype.length + 2));
                const timestamp = new Date(logtime).getTime();
                const transactionId = details.transactionId;
                const err = details.err;
                errors.push(this.createErrorLog(timestamp, logtype, transactionId, err))
            }
        }
        return errors;
    }

}