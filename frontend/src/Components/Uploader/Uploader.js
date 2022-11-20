import React, { useState } from 'react';
import axios from 'axios';
import UploadButton from './UploadButton';
import Result from '../Result/Result';
import './Uploader.css';

export default function Uploader() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadState, setUploadState] = useState('default');
    const [resultText, setResultText] = useState('');
    const [resultType, setResultType] = useState('err');

    const uploadFile = () => {
        const formData = new FormData();
        formData.append(
            "logfile",
            selectedFile,
            selectedFile.name
        );
        setUploadState('in-progress');
        axios.post('http://localhost:3001/upload', formData)
            .then(response => {
                setResultType('success');
                if (response.data.errors.length > 0) {
                    setResultText(JSON.stringify(response.data.errors));
                } else {
                    setResultText('There were no error statements in the logfile');
                }
            })
            .catch(err => {
                setResultType('err');
                setResultText(err);
            })
            .finally(() => {
                setUploadState('complete');
            });
    }

    return (
        <div className='uploader'>
            <center>
                <p style={{ textDecoration: 'underline' }}>Step 1: Please Upload the Log File</p>
                <UploadButton 
                    onUploadFile={uploadFile}
                    setFile={setSelectedFile} 
                    uploadState={uploadState} 
                />
                {
                    uploadState === 'complete' && (
                        <Result resultText={resultText} resultType={resultType} />
                    )
                }
            </center>
        </div>
    );
}