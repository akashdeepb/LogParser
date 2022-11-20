import React from 'react';
import './Uploader.css';

export default function UploadButton({ onUploadFile, uploadState='default' }) {
    const onFileChange = event => {
        onUploadFile(event.target.files[0]);
    }
    let message = <p>Click or Drop your file here</p>;
    let imgUrl = "https://cdn-icons-png.flaticon.com/512/2716/2716054.png";

    if (uploadState === 'in-progress') {
        message = <p>Uploading Your File</p>;
    } else if (uploadState === 'complete') {
        message = <p>File Uploaded. Click to Upload another file</p>
        imgUrl = "https://cdn-icons-png.flaticon.com/512/992/992481.png";
    }

    return (
        <div className='upload-zone' style={{ pointerEvents: uploadState === 'in-progress' ? 'none' : 'auto' }}>
            <input type="file" accept='.log' className='upload-btn' onChange={onFileChange} /><br/>
            <img src={imgUrl} alt="Upload icon" className='upload-img' />
            {message}
        </div>
    );
}