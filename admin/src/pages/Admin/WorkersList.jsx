import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const WorkersList = () => {
    const { workers, changeWorkerAvailability, aToken, getAllWorkers, loading } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            getAllWorkers();
        }
    }, [aToken]);

    // Show loader while data is being fetched
    if (loading) {
        return (
            <div className='flex justify-center items-center h-[80vh]'>
                <p className='text-gray-600'>Loading workers...</p>
            </div>
        );
    }

    return (
        <div className='m-5 max-h-[90vh] overflow-y-auto p-4'>
            <h1 className='text-lg font-medium mb-4'>All Workers</h1>

            {/* Workers Grid */}
            <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
                {workers && workers.length > 0 ? (
                    workers.map((item, index) => (
                        <div 
                            key={index} 
                            className='border border-[#C9D8FF] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow'
                        >
                            <img 
                                src={item.image || "https://via.placeholder.com/150"}  
                                alt={`${item.name}'s Profile`} 
                                className='bg-[#EAEFFF] w-full h-40 object-cover group-hover:bg-primary transition-all duration-300' 
                            />
                            <div className='p-4'>
                                <p className='text-[#262626] text-lg font-medium truncate'>{item.name}</p>
                                <p className='text-[#5C5C5C] text-sm truncate'>{item.category}</p>
                                
                                <div className='mt-2 flex items-center gap-2 text-sm'>
                                    <input 
                                        type="checkbox" 
                                        checked={item.available || false}
                                        onChange={() => changeWorkerAvailability(item._id)} 
                                        className='cursor-pointer w-4 h-4'
                                    />
                                    <p className='text-sm'>Active</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='text-gray-500 col-span-full text-center py-10'>
                        No workers found
                    </p>
                )}
            </div>
        </div>
    );
};

export default WorkersList;