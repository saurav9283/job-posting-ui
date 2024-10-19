import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Divider } from '@mui/material';


function Sidebar() {
    return (
        <div className="flex flex-col items-start p-4 border-r border-gray-300">
            <div className="flex items-center mb-4">
                <HomeIcon />
            </div>
            <Divider orientation="vertical" flexItem />
        </div>
    );
}

export default Sidebar
