import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import { WorkerContext } from '../context/WorkerContext';
import { AdminContext } from '../context/AdminContext';

const Sidebar = () => {
    const { wToken } = useContext(WorkerContext); // Renamed from dToken (Doctor) → wToken (Worker)
    const { aToken } = useContext(AdminContext);

    return (
        <div className='min-h-screen bg-white border-r'>
            {/* Admin Sidebar */}
            {aToken && (
                <ul className='text-[#515151] mt-5'>
                    <NavLink 
                        to="/admin-dashboard" 
                        className={({ isActive }) => 
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}
                    >
                        <img className='min-w-5' src={assets.home_icon} alt="Dashboard" />
                        <p className='hidden md:block'>Dashboard</p>
                    </NavLink>

                    <NavLink 
                        to="/all-bookings" 
                        className={({ isActive }) => 
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}
                    >
                        <img className='min-w-5' src={assets.booking_icon || assets.appointment_icon} alt="Bookings" />
                        <p className='hidden md:block'>All Bookings</p>
                    </NavLink>

                    <NavLink 
                        to="/add-worker" 
                        className={({ isActive }) => 
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}
                    >
                        <img className='min-w-5' src={assets.add_icon} alt="Add Worker" />
                        <p className='hidden md:block'>Add Worker</p>
                    </NavLink>

                    <NavLink 
                        to="/worker-list" 
                        className={({ isActive }) => 
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}
                    >
                        <img className='min-w-5' src={assets.worker_icon || assets.doctor_icon} alt="Workers" />
                        <p className='hidden md:block'>Workers List</p>
                    </NavLink>
                </ul>
            )}

            {/* Worker Sidebar */}
            {wToken && (
                <ul className='text-[#515151] mt-5'>
                    <NavLink 
                        to="/worker-dashboard" 
                        className={({ isActive }) => 
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}
                    >
                        <img className='min-w-5' src={assets.home_icon} alt="Dashboard" />
                        <p className='hidden md:block'>Dashboard</p>
                    </NavLink>

                    <NavLink 
                        to="/worker-bookings" 
                        className={({ isActive }) => 
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}
                    >
                        <img className='min-w-5' src={assets.booking_icon || assets.appointment_icon} alt="Bookings" />
                        <p className='hidden md:block'>My Bookings</p>
                    </NavLink>

                    <NavLink 
                        to="/worker-profile" 
                        className={({ isActive }) => 
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}
                    >
                        <img className='min-w-5' src={assets.profile_icon || assets.people_icon} alt="Profile" />
                        <p className='hidden md:block'>Profile</p>
                    </NavLink>
                </ul>
            )}
        </div>
    );
};

export default Sidebar;