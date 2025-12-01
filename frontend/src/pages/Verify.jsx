import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const bookingId = searchParams.get("bookingId");

    const { backendUrl, token } = useContext(AppContext);
    const navigate = useNavigate();

    // Function to verify stripe/razorpay payment
    const verifyPayment = async () => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/user/verify-payment`, 
                { success, bookingId }, 
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message || "Payment Verified Successfully");
            } else {
                toast.error(data.message || "Payment Verification Failed");
            }

            navigate("/my-bookings");

        } catch (error) {
            toast.error(error.message || "Something went wrong during verification");
            console.log("Verification Error:", error);
        }
    };

    useEffect(() => {
        if (token && bookingId && success !== null) {
            verifyPayment();
        }
    }, [token]);

    return (
        <div className='min-h-[60vh] flex items-center justify-center'>
            <div className="w-16 h-16 border-4 border-gray-300 border-t-4 border-t-primary rounded-full animate-spin"></div>
        </div>
    );
};

export default Verify;