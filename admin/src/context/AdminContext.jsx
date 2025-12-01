import React, { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
    const [loading, setLoading] = useState(true);

    const [bookings, setBookings] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [dashData, setDashData] = useState(null);

    // Fetch all local workers
    const getAllWorkers = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/admin/all-workers', { headers: { aToken } })
            if (data.success) {
                setWorkers(data.workers)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    };

    // Change worker availability
    const changeWorkerAvailability = async (workerId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/worker/change-availability', { workerId } , { headers: { aToken } });

            if (data.success) {
                toast.success(data.message);
                getAllWorkers();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    // Get all bookings for admin panel
    const getAllBookings = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/bookings', { headers: { aToken } })
            if (data.success) {
                setBookings(data.bookings.reverse())
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    };

    // Cancel a booking via admin
    const cancelBooking = async (BookingId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/admin/cancel-booking', { BookingId }, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message);
                getAllBookings();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }

    };

    // Get dashboard stats
     const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } });

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
        aToken, setAToken,
        workers,
        getAllWorkers,
        changeWorkerAvailability,
        bookings,
        getAllBookings,
        dashData,
        getDashData,
        cancelBooking,
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;