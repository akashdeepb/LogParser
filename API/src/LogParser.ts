import fs from 'fs';

/**
* LogParser Class
* Handles Log File functions
**/
export class LogParser {
    Constructor () {
        // Default Constructor
    }

    // Function to get data from passed logfile (filepath)
    getDataFromLogFile(filepath: string) {
        return new Promise((resolve, reject) => {
            fs.readFile(filepath, { encoding: 'utf-8' }, (err, data) => {
                if(err) reject(null);
                resolve(data);
            });
        });
    }

    // Function to get time from a single log
    getLogTime(text: string) {
        return text.slice(0,24);
    }

    // Function to get type of log passed
    getLogType(text: string) {
        return text.slice(24).split("-", 2)[1];
    }

    // Function to convert given error log to object
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

    // Function to parse errors from given logfile content
    parseErrors(text: string) {
        let errors: Object[] = [];
        const lines = text.split("\n");
        
        // Iterate over lines
        for(let i=0;i<lines.length;i++) {
            const logtype = this.getLogType(lines[i]);
            
            // Validate if its an error or warn log
            if(logtype === 'warn' || logtype === 'error') {
                const logtime = this.getLogTime(lines[i]);
                const details = JSON.parse(lines[i].slice(logtime.length + logtype.length + 2));
                const timestamp = new Date(logtime).getTime();
                const transactionId = details.transactionId;
                const err = details.err;
                
                // Push the error to errors array
                errors.push(this.createErrorLog(timestamp, logtype, transactionId, err))
            }
        }
        
        // Return errors
        return errors;
    }

}
