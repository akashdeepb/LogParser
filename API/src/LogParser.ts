export class LogParser {
    LogParser() {

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
        if(text.includes("err")) {
            const logtime = this.getLogTime(text);
            const logtype = this.getLogType(text);
            const details = JSON.parse(text.slice(logtime.length + logtype.length + 2));
            const timestamp = new Date(logtime).getTime();
            const transactionId = details.transactionId;
            const err = details.err;
            errors.push(this.createErrorLog(timestamp, logtype, transactionId, err))
        }
        return errors;
    }

}