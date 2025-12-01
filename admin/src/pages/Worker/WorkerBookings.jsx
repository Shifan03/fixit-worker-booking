import React, { useContext, useEffect } from 'react';
import { WorkerContext } from '../../context/WorkerContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const WorkerBookings = () => {
    const { wToken, bookings, getBookings, cancelBooking, completeBooking } = useContext(WorkerContext);
    const { slotDateFormat, calculateAge, currencySymbol } = useContext(AppContext);

    // Fetch bookings when token is available
    useEffect(() => {
        if (wToken) {
            getBookings();
        }
    }, [wToken]);

    // Show loader while fetching data
    if (!bookings.length) {
        return (
            <div className='flex justify-center items-center h-[60vh]'>
                <p className='text-gray-500'>No bookings found</p>
            </div>
        );
    }

    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-medium'>All Bookings</p>

            {/* Booking List Container */}
            <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>

                {/* Table Header - Desktop */}
                <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
                    <p>#</p>
                    <p>Customer</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Amount</p>
                    <p>Action</p>
                </div>

                {/* Booking Rows */}
                {bookings.map((item, index) => {

                    // Safely access customer data
                    const customerName = item.userData?.name || "N/A";
                    const customerImage = item.userData?.image || assets.profile_pic;
                    const dob = item.userData?.dob;

                    // Safely format age
                    let age = "N/A";
                    if (dob && !isNaN(dob)) {
                        age = calculateAge(dob);
                    }

                    // Safely format job date
                    let formattedDate = "Invalid Date";
                    if (item.slotDate && !isNaN(item.slotDate)) {
                        formattedDate = slotDateFormat(item.slotDate);
                    }

                    return (
                        <div 
                            key={index}
                            className='flex flex-wrap justify-between max-sm:gap-5 sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
                        >
                            {/* Index */}
                            <p className='max-sm:hidden'>{index + 1}</p>

                            {/* Customer Info */}
                            <div className='flex items-center gap-2'>
                                <img src={customerImage} className='w-8 rounded-full' alt="Customer" />
                                <p>{customerName}</p>
                            </div>

                            {/* Payment Type */}
                            <div>
                                <p className='text-xs inline border border-primary px-2 rounded-full'>
                                    {item.payment ? 'Online' : 'Cash'}
                                </p>
                            </div>

                            {/* Age */}
                            <p className='max-sm:hidden'>{age !== "N/A" ? `${age} yrs` : age}</p>

                            {/* Booking Date & Time */}
                            <p>{formattedDate}, {item.slotTime || "N/A"}</p>

                            {/* Amount */}
                            <p>{currencySymbol}{item.amount || 0}</p>

                            {/* Action Buttons */}
                            {item.cancelled ? (
                                <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                            ) : item.isCompleted ? (
                                <p className='text-green-500 text-xs font-medium'>Completed</p>
                            ) : (
                                <div className='flex gap-3'>
                                    <img 
                                        onClick={() => cancelBooking(item._id)} 
                                        className='w-8 cursor-pointer' 
                                        src={assets.cancel_icon} 
                                        alt="Cancel"
                                    />
                                    <img 
                                        onClick={() => completeBooking(item._id)} 
                                        className='w-8 cursor-pointer' 
                                        src={assets.tick_icon} 
                                        alt="Complete"
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WorkerBookings;