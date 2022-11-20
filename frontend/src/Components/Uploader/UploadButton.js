import React from 'react';
import './Uploader.css';

export default function UploadButton({ onUploadFile, setFile, uploadState='default' }) {
    const onFileChange = event => {
        setFile(event.target.files[0]);
        onUploadFile();
    }
    let message = <p>Click or Drop your file here</p>;

    if (uploadState === 'in-progress') {
        message = <p>Uploading Your File</p>;
    } 

    return (
        <div className='upload-zone' style={{ pointerEvents: uploadState === 'in-progress' ? 'none' : 'auto' }}>
            <input type="file" className='upload-btn' onChange={onFileChange} /><br/>
            <img src="https://cdn-icons-png.flaticon.com/512/2716/2716054.png" alt="Upload icon" className='upload-img' />
            {message}
        </div>
    );
}