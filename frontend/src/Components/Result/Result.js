import React from 'react';
import './Result.css';

export default function Result({ resultText, resultType = 'err' }) {
    return (
        <div className='result'>
            <center>
                <p style={{ textDecoration: 'underline' }}>Step 2: Your file is parsed, find result below.</p>
                <div className='result-holder' style={{ backgroundColor: resultType === 'err' ? '#FFFF99' : '#ffc6c4' }}>
                    <p>{resultText}</p>
                </div>
            </center>
        </div>
    )
}