import React, { useContext, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
    const { aToken, getDashData, cancelBooking, dashData } = useContext(AdminContext);
    const { slotDateFormat } = useContext(AppContext);

    useEffect(() => {
        if (aToken) {
            getDashData();
        }
    }, [aToken]);

    // Show loader or fallback
    if (!dashData) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <p className="text-gray-500 text-lg">Loading dashboard data...</p>
            </div>
        );
    }

    return (
        <div className="m-5">
            {/* Stats Cards */}
            <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300">
                    <img className="w-14" src={assets.worker_icon || assets.doctor_icon} alt="Workers" />
                    <div>
                        <p className="text-xl font-semibold text-gray-600">{dashData.workers}</p>
                        <p className="text-gray-400">Workers</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300">
                    <img className="w-14" src={assets.bookings_icon || assets.appointments_icon} alt="Bookings" />
                    <div>
                        <p className="text-xl font-semibold text-gray-600">{dashData.bookings}</p>
                        <p className="text-gray-400">Bookings</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300">
                    <img className="w-14" src={assets.customers_icon || assets.patients_icon} alt="Customers" />
                    <div>
                        <p className="text-xl font-semibold text-gray-600">{dashData.customers}</p>
                        <p className="text-gray-400">Customers</p>
                    </div>
                </div>
            </div>

            {/* Latest Bookings Section */}
            <div className="bg-white mt-6 shadow-sm rounded">
                <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border-b">
                    <img src={assets.list_icon} alt="List" />
                    <p className="font-semibold">Latest Bookings</p>
                </div>

                <div className="pt-4 border border-t-0 rounded-b">
                    {dashData.latestBookings && dashData.latestBookings.length > 0 ? (
                        dashData.latestBookings.slice(0, 5).map((item, index) => (
                            <div key={index} className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100">
                                <img 
                                    className="rounded-full w-10" 
                                    src={item.workerData?.image} 
                                    alt={`${item.workerData?.name}'s profile`} 
                                />
                                <div className="flex-1 text-sm">
                                    <p className="text-gray-800 font-medium">{item.workerData?.name}</p>
                                    <p className="text-gray-600">Booking on {slotDateFormat(item.slotDate)}</p>
                                </div>
                                {item.cancelled ? (
                                    <p className="text-red-400 text-xs font-medium">Cancelled</p>
                                ) : item.isCompleted ? (
                                    <p className="text-green-500 text-xs font-medium">Completed</p>
                                ) : (
                                    <img 
                                        onClick={() => cancelBooking(item._id)} 
                                        className="w-10 cursor-pointer" 
                                        src={assets.cancel_icon} 
                                        alt="Cancel Booking"
                                    />
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="px-6 py-3 text-gray-500">No recent bookings found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;