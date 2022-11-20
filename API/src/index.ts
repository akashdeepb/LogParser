import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { LogParser } from './LogParser';
const app = express();
const upload = multer({ dest: './uploads/' });

app.use(cors());

const port = process.env.PORT || 3001;

app.use('/upload', upload.single('logfile'), (req, res) => {
    const filename = req.file?.filename;
    const filepath = path.resolve('./uploads/' + filename);
    const logParser  = new LogParser();
    logParser.getDataFromLogFile(filepath)
        .then(data => {
            console.log(data);
            const errors = logParser.parseErrors(data);
            res.status(200).json({errors});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error : "Error Parsing File"});
        });
});

app.listen(port, () => {
    console.log(`Backend for Beanstalk Assignment running @${port}`);
});