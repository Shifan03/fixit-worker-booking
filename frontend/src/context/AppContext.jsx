import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const currencySymbol = '₹'; // Change if needed (e.g., $, £)
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [workers, setWorkers] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
    const [userData, setUserData] = useState(false);

    // Fetch all local workers
    const getWorkersData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/workers');
            if (data.success) {
                setWorkers(data.workers);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

    };


    // Load user profile data
    const loadUserProfileData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/customer/get-profile', { headers: { token } });

            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

    };

    // Load workers on mount
    useEffect(() => {
        getWorkersData();
    }, []);

    // Load user data when token changes
    useEffect(() => {
        if (token) {
            loadUserProfileData();
        }
    }, [token]);

    const value = {
        workers,
        getWorkersData,
        currencySymbol,
        backendUrl,
        token, setToken,
        userData,
        setUserData,
        loadUserProfileData
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;