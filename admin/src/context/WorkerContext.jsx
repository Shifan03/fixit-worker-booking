import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const WorkerContext = createContext();

const WorkerContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [wToken, setWToken] = useState(localStorage.getItem('wToken') ? localStorage.getItem('wToken') : '');
    const [bookings, setBookings] = useState([]);
    const [dashData, setDashData] = useState(false);
    const [profileData, setProfileData] = useState(false);

    // Get all bookings for the logged-in worker
    const getBookings = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/workers/bookings', {
                headers: { wToken }
            });

            if (data.success) {
                setBookings(data.bookings.reverse());
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Get worker's own profile data
    const getProfileData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/workers/profile', { headers: { wToken } })
            console.log(data.profileData)
            setProfileData(data.profileData)

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Cancel a booking (e.g., customer cancels)
    const cancelBooking = async (bookingId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/workers/cancel-booking',
                { bookingId },
                { headers: { wToken } }
            );

            if (data.success) {
                toast.success(data.message);
                getBookings();
                getDashData(); // Optional: update dashboard stats
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Mark a job as completed
    const completeBooking = async (bookingId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/workers/complete-booking',
                { bookingId },
                { headers: { wToken } }
            );

            if (data.success) {
                toast.success(data.message);
                getBookings();
                getDashData(); // Optional: update dashboard stats
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    // Fetch worker dashboard stats
    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/workers/dashboard', {
                headers: { wToken }
            });

            if (data.success) {
                setDashData(data.dashData);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const value = {
        wToken, setWToken, backendUrl,
        bookings,
        getBookings,
        dashData, getDashData,
        profileData, setProfileData,
        getProfileData,
        cancelBooking,
        completeBooking
    };

    return (
        <WorkerContext.Provider value={value}>
            {props.children}
        </WorkerContext.Provider>
    );
};

export default WorkerContextProvider;