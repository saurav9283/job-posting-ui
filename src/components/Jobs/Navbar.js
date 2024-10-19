import React from 'react'
import logo from '../image/logo.png';

function Navbar() {
    return (
        <div className="flex justify-between items-center p-4 bg-white shadow-md">
            <div>
                <img src={logo} alt="Logo" className="h-7" />
            </div>
            <div className="text-lg font-semibold">Contact</div>
        </div>
    );
}

export default Navbar
