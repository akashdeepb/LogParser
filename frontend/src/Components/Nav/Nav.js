import React from 'react';
import './Nav.css';

export default function Nav() {
    return (
        <div className='nav'>
            <div className="left-nav">
                {/*Image attribution: Log icon by @Smartline on Flaticon*/}
                <img src="https://cdn-icons-png.flaticon.com/512/569/569837.png" className="icon" alt="Logo for page" />
                <p className='title'>Logfile Parser</p>
            </div>
                <p className='author'>@akashdeepb</p>
        </div>
    );
}