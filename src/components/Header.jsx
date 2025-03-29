import React from 'react';
import { FaUser } from 'react-icons/fa';

const Header = () => {
    return (
        <header>
            <div className="logo">AI Dashboard</div>
            <div className="user-info">
                <div className="user-avatar">
                    <FaUser />
                </div>
                <span>Admin</span>
            </div>
        </header>
    );
};

export default Header;