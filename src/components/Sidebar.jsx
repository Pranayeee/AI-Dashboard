import React, { useState } from 'react';
import { 
    FaHome, 
    FaRobot, 
    FaCog, 
    FaChartBar, 
    FaHistory 
} from 'react-icons/fa';

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('Dashboard');

    const menuItems = [
        { name: 'Dashboard', icon: <FaHome /> },
        { name: 'AI Models', icon: <FaRobot /> },
        { name: 'Settings', icon: <FaCog /> },
        { name: 'Analytics', icon: <FaChartBar /> },
        { name: 'History', icon: <FaHistory /> }
    ];

    return (
        <div className="sidebar">
            <ul className="sidebar-menu">
                {menuItems.map((item) => (
                    <li
                        key={item.name}
                        className={activeItem === item.name ? 'active' : ''}
                        onClick={() => setActiveItem(item.name)}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;