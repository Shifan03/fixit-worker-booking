import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const MyBookings = () => {
    const { backendUrl, token } = useContext(AppContext);
    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState(null);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format date (e.g., 20_01_2000 → 20 Jan 2000)
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_');
        return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
    };

    // Fetch user bookings
    const getUserBookings = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/customer/bookings', { headers: { token } });
            setBookings(data.bookings.reverse());

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Cancel a booking
    const cancelBooking = async (bookingId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/customer/cancel-booking', { bookingId }, { headers: { token } });

            if (data.success) {
                toast.success(data.message);
                getUserBookings();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

    };

    // Razorpay Payment Init
    const initRazorpay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Service Booking',
            description: 'Payment for local service',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(backendUrl + "/api/customer/verifyRazorpay", response, { headers: { token } });
                    if (data.success) {
                        navigate('/my-bookings');
                        getUserBookings();
                    } 
                } catch (error) {
                    console.log(error)
                    toast.error(error.message);
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    // Trigger Razorpay payment
    const bookWorkerRazorpay = async (bookingId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/customer/payment-razorpay`,
                { bookingId },
                { headers: { token } }
            );

            if (data.success) {
                initRazorpay(data.order);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log("Razorpay Error:", error);
            toast.error(error.message || "Something went wrong");
        }
    };

    // Trigger Stripe payment
    const bookWorkerStripe = async (bookingId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/customer/payment-stripe', { bookingId }, { headers: { token } })
            if (data.success) {
                const { session_url } = data
                window.location.replace(session_url)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    };

    useEffect(() => {
        if (token) {
            getUserBookings();
        }
    }, [token]);

    return (
        <div>
            <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>My Bookings</p>

            {bookings.length === 0 ? (
                <p className='mt-10 text-center text-gray-500'>No bookings found.</p>
            ) : (
                <div>
                    {bookings.map((item, index) => (
                        <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b'>
                            {/* Worker Image */}
                            <div>
                                <img 
                                    className='w-36 bg-[#EAEFFF]' 
                                    src={item.workerData.image} 
                                    alt={`${item.workerData.name}'s profile`} 
                                />
                            </div>

                            {/* Booking Info */}
                            <div className='flex-1 text-sm text-[#5E5E5E]'>
                                <p className='text-[#262626] text-base font-semibold'>{item.workerData.name}</p>
                                <p>{item.workerData.category}</p>
                                <p className='text-[#464646] font-medium mt-1'>Address:</p>
                                <p>{item.workerData.address.line1}</p>
                                <p>{item.workerData.address.line2}</p>
                                <p className='mt-1'>
                                    <span className='text-sm text-[#3C3C3C] font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div></div>
                            <div className='flex flex-col gap-2 justify-end text-sm text-center'>
                                {!item.cancelled && !item.payment && !item.isCompleted && paymentMethod !== item._id && (
                                    <button 
                                        onClick={() => setPaymentMethod(item._id)} 
                                        className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'
                                    >
                                        Pay Online
                                    </button>
                                )}

                                {!item.cancelled && !item.payment && !item.isCompleted && paymentMethod === item._id && (
                                    <button 
                                        onClick={() => bookWorkerStripe(item._id)}
                                        className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center'>
                                        <img className='max-w-20 max-h-5' src={assets.stripe_logo} alt="Stripe" />
                                    </button>
                                )}

                                {!item.cancelled && !item.payment && !item.isCompleted && paymentMethod === item._id && (
                                    <button 
                                        onClick={() => bookWorkerRazorpay(item._id)}
                                        className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center'>
                                        <img className='max-w-20 max-h-5' src={assets.razorpay_logo} alt="Razorpay" />
                                    </button>
                                )}

                                {!item.cancelled && item.payment && !item.isCompleted && (
                                    <button className='sm:min-w-48 py-2 border rounded text-[#696969] bg-[#EAEFFF]'>
                                        Paid
                                    </button>
                                )}

                                {item.isCompleted && (
                                    <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>
                                        Completed
                                    </button>
                                )}

                                {!item.cancelled && !item.isCompleted && (
                                    <button 
                                        onClick={() => cancelBooking(item._id)} 
                                        className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>
                                        Cancel Booking
                                    </button>
                                )}

                                {item.cancelled && !item.isCompleted && (
                                    <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>
                                        Booking Cancelled
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;