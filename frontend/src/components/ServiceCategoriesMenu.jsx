import React from 'react';
import { serviceCategories } from '../assets/assets'; // renamed from specialityData
import { Link } from 'react-router-dom';

const ServiceCategoriesMenu = () => {
    return (
        <div id='services' className='flex flex-col items-center gap-4 py-16 text-[#262626]'>
            <h1 className='text-3xl font-medium'>Find by Service Category</h1>
            <p className='sm:w-1/3 text-center text-sm'>
                Simply browse through our extensive list of trusted workers, hire for any service hassle-free.
            </p>
            <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
                {serviceCategories.map((item, index) => (
                    <Link 
                        to={`/workers/${item.category}`} 
                        onClick={() => window.scrollTo(0, 0)} 
                        key={index} 
                        className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'
                    >
                        <img 
                            className='w-16 sm:w-24 mb-2' 
                            src={item.image} 
                            alt={`${item.category} icon`} 
                        />
                        <p>{item.category}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ServiceCategoriesMenu;