  import React, { useContext, useEffect } from 'react';
import { WorkerContext } from '../../context/WorkerContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const WorkerDashboard = () => {
    const { wToken, dashData, getDashData, completeBooking, cancelBooking } = useContext(WorkerContext);
    const { slotDateFormat, currencySymbol } = useContext(AppContext); // ✅ Moved here to define currencySymbol

    // Fetch dashboard data on mount
    useEffect(() => {
        if (wToken) {
            getDashData(); // This should fetch bookings and calculate stats
        }
    }, [wToken]);

    // Show loader while fetching
    if (!dashData) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="m-5 p-4">

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                
                {/* Earnings Card */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
                    <img 
                        src={assets.earning_icon || assets.info_icon} 
                        alt="Earnings" 
                        className="w-12"
                    />
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700">{currencySymbol} {dashData.earnings || 0}</h3>
                        <p className="text-gray-500 text-sm">Total Earnings</p>
                    </div>
                </div>

                {/* Total Bookings Card */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
                    <img 
                        src={assets.bookings_icon || assets.appointments_icon} 
                        alt="Bookings" 
                        className="w-12"
                    />
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700">{dashData.bookings || 0}</h3>
                        <p className="text-gray-500 text-sm">Total Jobs</p>
                    </div>
                </div>

                {/* Unique Customers Card */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
                    <img 
                        src={assets.customers_icon || assets.patients_icon} 
                        alt="Customers" 
                        className="w-12"
                    />
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700">{dashData.customers || 0}</h3>
                        <p className="text-gray-500 text-sm">Unique Customers</p>
                    </div>
                </div>
            </div>

            {/* Latest Bookings Section */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-4 bg-gray-50 border-b">
                    <img src={assets.list_icon} alt="List" className="w-6" />
                    <h2 className="font-semibold">Latest Bookings</h2>
                </div>

                <div className="divide-y">
                    {dashData.latestBookings && dashData.latestBookings.length > 0 ? (
                        dashData.latestBookings.slice(0, 5).map((item, index) => (
                            <div 
                                key={index}
                                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                            >
                                {/* Customer Info */}
                                <div className="flex items-center gap-3">
                                    <img 
                                        src={item.userData?.image || "https://via.placeholder.com/40  "}  
                                        alt={`${item.userData?.name}'s Profile`} 
                                        className="rounded-full w-10 h-10 object-cover"
                                    />
                                    <div>
                                        <p className="text-gray-800 font-medium">{item.userData?.name || "Customer"}</p>
                                        <p className="text-gray-500 text-sm">
                                            Booked on {slotDateFormat(item.slotDate)} at {item.slotTime}
                                        </p>
                                    </div>
                                </div>

                                {/* Status & Actions */}
                                <div className="flex items-center gap-4">
                                    {item.cancelled ? (
                                        <p className="text-red-500 text-xs font-medium">Cancelled</p>
                                    ) : item.isCompleted ? (
                                        <p className="text-green-500 text-xs font-medium">Completed</p>
                                    ) : (
                                        <div className="flex gap-3">
                                            <img 
                                                onClick={() => cancelBooking(item._id)}
                                                className="w-8 cursor-pointer"
                                                src={assets.cancel_icon}
                                                alt="Cancel"
                                            />
                                            <img 
                                                onClick={() => completeBooking(item._id)}
                                                className="w-8 cursor-pointer"
                                                src={assets.tick_icon}
                                                alt="Complete"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="px-6 py-4 text-gray-500">No recent bookings found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkerDashboard;
