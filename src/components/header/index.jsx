import React from 'react';

import "./header.css"
function Footer(props) {
    return (
        <div className='header'>
            <div className='d-flex justify-content-between align-items-center px-2'>
            <h1>Dashboard</h1>
            <div>Search bar</div>
            <div>Notification</div>
            <div>User</div>
        </div>
        </div>
    );
}

export default Footer;