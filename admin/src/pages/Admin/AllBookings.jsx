import React, { useEffect } from 'react';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const AllBookings = () => {
    const { aToken, bookings, cancelBooking, getAllBookings } = useContext(AdminContext);
    const { slotDateFormat, calculateAge, currencySymbol } = useContext(AppContext);

    useEffect(() => {
        if (aToken) {
            getAllBookings(); // Fetch all bookings
        }
    }, [aToken]);

    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-medium'>All Bookings</p>

            <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
                {/* Table Header */}
                <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
                    <p>#</p>
                    <p>Customer</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Worker</p>
                    <p>Amount</p>
                    <p>Action</p>
                </div>

                {/* Booking List */}
                {bookings.map((item, index) => {
                    const age = calculateAge(item.userData?.dob || '');
                    const amount = isNaN(item.amount) ? 0 : item.amount;

                    return (
                        <div 
                            key={index}
                            className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
                        >
                            <p className='max-sm:hidden'>{index + 1}</p>

                            {/* Customer Info */}
                            <div className='flex items-center gap-2'>
                                <img 
                                    src={item.userData?.image || assets.default_avatar} 
                                    className='w-8 rounded-full' 
                                    alt="Customer" 
                                />
                                <p>{item.userData?.name || 'Unknown'}</p>
                            </div>

                            {/* Customer Age */}
                            <p className='max-sm:hidden'>{isNaN(age) ? 'N/A' : age}</p>

                            {/* Booking Date & Time */}
                            <p>
                                {slotDateFormat(item.slotDate || '')}, {item.slotTime || 'N/A'}
                            </p>

                            {/* Worker Info */}
                            <div className='flex items-center gap-2'>
                                <img 
                                    src={item.workerData?.image || assets.default_avatar} 
                                    className='w-8 rounded-full bg-gray-200' 
                                    alt="Worker" 
                                />
                                <p>{item.workerData?.name || 'Unknown'}</p>
                            </div>

                            {/* Amount */}
                            <p>{currencySymbol}{amount}</p>

                            {/* Action Button */}
                            {item.cancelled ? (
                                <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                            ) : item.isCompleted ? (
                                <p className='text-green-500 text-xs font-medium'>Completed</p>
                            ) : (
                                <img 
                                    onClick={() => cancelBooking(item._id)} 
                                    className='w-10 cursor-pointer' 
                                    src={assets.cancel_icon} 
                                    alt="Cancel Booking" 
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AllBookings;
