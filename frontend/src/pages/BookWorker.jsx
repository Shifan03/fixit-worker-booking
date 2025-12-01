import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedWorkers from '../components/RelatedWorkers'; // Updated component
import axios from 'axios';
import { toast } from 'react-toastify';

const BookWorker = () => {

    const { workerId } = useParams();
    const { workers, currencySymbol, backendUrl, token, getWorkersData } = useContext(AppContext);
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const [workerInfo, setWorkerInfo] = useState(false);
    const [workerSlots, setWorkerSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    const navigate = useNavigate()

    const fetchWorkerInfo = async () => {
        const worker = workers.find((w) => w._id === workerId);
        setWorkerInfo(worker);
    };

    const getAvailableSolts = async () => {

        setWorkerSlots([]);

        // getting current date
        let today = new Date()

        for (let i = 0; i < 7; i++) {

            // getting date with index 
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // setting end time of the date with index
            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0);

            // setting hours 
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];


            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate();
                let month = currentDate.getMonth() + 1;
                let year = currentDate.getFullYear();

                const slotDate = day + "_" + month + "_" + year;
                const slotTime = formattedTime;

                const isSlotAvailable = workerInfo.slots_booked[slotDate] && workerInfo.slots_booked[slotDate].includes(slotTime) ? false : true

                if (isSlotAvailable) {

                    // Add slot to array
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                // Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setWorkerSlots(prev => [...prev, timeSlots]);

        }

    }

    const handleBooking = async () => {

        if (!token) {
            toast.warning('Login to book a service')
            return navigate('/login')
        }

        if (!slotTime) {
            toast.warning('Please select a time slot');
            return;
        }

        const date = workerSlots[slotIndex][0].datetime;

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        const slotDate = day + "_" + month + "_" + year;

        try {

            const { data } = await axios.post(backendUrl + '/api/customer/book-worker', { 
	workerId, 
	slotDate, 
        slotTime 
	}, { 
	    headers: { token } 
	    });

            if (data.success) {
                toast.success(data.message);
                getWorkersData();
                navigate('/my-bookings');
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

    }

    useEffect(() => {
        if (workers.length > 0) {
            fetchWorkerInfo()
        }
    }, [workers, workerId]);

    useEffect(() => {
        if (workerInfo) {
            getAvailableSolts();
        }
    }, [workerInfo]);


    return workerInfo ? (
        <div className="book-worker-page">

            {/* Worker Profile */}
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img 
                        className='bg-primary w-full sm:max-w-72 rounded-lg' 
                        src={workerInfo.image} 
                        alt={`${workerInfo.name}'s profile`} 
                    />
                </div>

                <div className='flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>

                    {/* Worker Info */}
                    <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>
                        {workerInfo.name} 
                        <img className='w-5' src={assets.verified_icon} alt="Verified" />
                    </p>
                    <div className='flex items-center gap-2 mt-1 text-gray-600'>
                        <p>{workerInfo.category}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{workerInfo.experience}</button>
                    </div>

                    {/* About Worker */}
                    <div className='mt-3'>
                        <p className='flex items-center gap-1 text-sm font-medium text-[#262626]'>
                            About <img className='w-3' src={assets.info_icon} alt="info" />
                        </p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
                            {workerInfo.about}
                        </p>
                    </div>

                    {/* Hourly Rate */}
                    <p className='text-gray-600 font-medium mt-4'>
                        Hourly Rate: <span className='text-gray-800'>{currencySymbol}{workerInfo.hourlyRate}</span>
                    </p>
                </div>
            </div>

            {/* Booking Slots */}
            <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]'>
                <p>Booking Slots</p>

                {/* Date Selector */}
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {workerSlots.length > 0 && workerSlots.map((item, index) => (
                        <div 
                            onClick={() => setSlotIndex(index)} 
                            key={index} 
                            className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-[#DDDDDD]'}`}
                        >
                            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>

                {/* Time Slots */}
                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                    {workerSlots.length > 0 && workerSlots[slotIndex]?.map((item, index) => (
                        <p 
                            onClick={() => setSlotTime(item.time)} 
                            key={index} 
                            className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                                item.time === slotTime 
                                    ? 'bg-primary text-white' 
                                    : 'text-[#949494] border border-[#B4B4B4]'
                            }`}
                        >
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>

                {/* Book Button */}
                <button 
                    onClick={handleBooking} 
                    className='bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6'
                >
                    Book Service
                </button>
            </div>

            {/* Related Workers Section */}
            <RelatedWorkers category={workerInfo.category} workerId={workerId} />

        </div>
    ) : null;
};

export default BookWorker;