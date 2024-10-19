import React from 'react'
import logo from '../image/logo.png';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        console.log('Logout clicked');
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        navigate("/")

    };

    return (
        <div className="flex justify-between items-center p-4 bg-white shadow-md">
            <div>
                <img src={logo} alt="Logo" className="h-7" />
            </div>
            <div className=' flex gap-5'>
                <div className="text-lg font-semibold">Contact</div>
                <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                className="ml-auto"
            >
                Logout
            </Button>            </div>
        </div>
    );
}

export default Navbar
