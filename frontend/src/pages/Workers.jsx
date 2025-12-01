import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Workers = () => {
    const { category } = useParams(); // e.g., electrician, plumber
    const [filteredWorkers, setFilteredWorkers] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const navigate = useNavigate();
    const { workers } = useContext(AppContext); // Ensure AppContext provides `workers`

    const applyFilter = () => {
        if (category) {
            setFilteredWorkers(workers.filter(worker => worker.category === category));
        } else {
            setFilteredWorkers(workers);
        }
    };

    useEffect(() => {
       applyFilter();
    }, [workers, category]);

    return (
        <div className='px-4 md:px-10'>
            <p className='text-gray-600 text-sm sm:text-base'>Browse through the workers by category.</p>

            <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
                {/* Filter Toggle Button */}
                <button 
                    onClick={() => setShowFilter(!showFilter)} 
                    className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}
                >
                    Filters
                </button>

                {/* Categories / Filters */}
                <div className={`flex flex-col gap-4 text-sm text-gray-600 w-full sm:w-auto ${showFilter ? 'flex sm:flex' : 'hidden sm:flex'}`}>
                    <p 
                        onClick={() => navigate(category === 'Cleaning' ? '/workers' : '/workers/Cleaning')}
                        className={`pl-3 py-2 pr-16 border border-gray-300 rounded cursor-pointer transition-all ${
                            category === 'Cleaning' ? 'bg-[#E2E5FF] text-black font-medium' : ''
                        }`}
                    >
                        Cleaning
                    </p>
                    <p 
                        onClick={() => navigate(category === 'Electrician' ? '/workers' : '/workers/Electrician')}
                        className={`pl-3 py-2 pr-16 border border-gray-300 rounded cursor-pointer transition-all ${
                            category === 'Electrician' ? 'bg-[#E2E5FF] text-black font-medium' : ''
                        }`}
                    >
                        Electrician
                    </p>
                    <p 
                        onClick={() => navigate(category === 'Painter' ? '/workers' : '/workers/Painter')}
                        className={`pl-3 py-2 pr-16 border border-gray-300 rounded cursor-pointer transition-all ${
                            category === 'Painter' ? 'bg-[#E2E5FF] text-black font-medium' : ''
                        }`}
                    >
                        Painter
                    </p>
                    <p 
                        onClick={() => navigate(category === 'Plumber' ? '/workers' : '/workers/Plumber')}
                        className={`pl-3 py-2 pr-16 border border-gray-300 rounded cursor-pointer transition-all ${
                            category === 'Plumber' ? 'bg-[#EAEAFF]' : ''
                        }`}
                    >
                        Plumber
                    </p>
                    <p 
                        onClick={() => navigate(category === 'Repairing' ? '/workers' : '/workers/Repairing')}
                        className={`pl-3 py-2 pr-16 border border-gray-300 rounded cursor-pointer transition-all ${
                            category === 'Repairing' ? 'bg-[#EAEAFF]' : ''
                        }`}
                    >
                        Repairing
                    </p>
                    <p 
                        onClick={() => navigate(category === 'Transportation' ? '/workers' : '/workers/Transportation')}
                        className={`pl-3 py-2 pr-16 border border-gray-300 rounded cursor-pointer transition-all ${
                            category === 'Transportation' ? 'bg-[#EAEAFF]' : ''
                        }`}
                    >
                        Transportation
                    </p>
                </div>

                {/* Worker Grid */}
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6'>
                    {filteredWorkers.map((worker, index) => (
                        <div 
                            key={index}
                            onClick={() => { 
                                navigate(`/book-worker/${worker._id}`); 
                                window.scrollTo(0, 0); 
                            }} 
                            className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                        >
                            <img className='bg-[#EAEFFF]' src={worker.image} alt={`${worker.name}'s profile`} />
                            <div className='p-4'>
                                <div className={`flex items-center gap-2 text-sm ${worker.available ? 'text-green-500' : 'text-gray-500'}`}>
                                    <p className={`w-2 h-2 rounded-full ${worker.available ? 'bg-green-500' : 'bg-gray-500'}`}></p>
                                    <p>{worker.available ? 'Available' : 'Not Available'}</p>
                                </div>
                                <p className='text-[#262626] text-lg font-medium'>{worker.name}</p>
                                <p className='text-[#5C5C5C] text-sm'>{worker.category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Workers;