import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
    return (
        <div>

            {/* Page Title */}
            <div className='text-center text-2xl pt-10 text-[#707070]'>
                <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
            </div>

            {/* Contact Info Section */}
            <div className='my-10 flex flex-col md:flex-row gap-10 mb-28 text-sm px-4 md:px-0'>
                <img 
                    className='w-full md:max-w-[360px]' 
                    src={assets.contact_image} 
                    alt="Contact Us" 
                />
                
                <div className='flex flex-col justify-center items-start gap-6'>

                    <p className='font-semibold text-lg text-gray-600'>OUR OFFICE</p>
                    <p className='text-gray-500'>
                        54709 Railway Station <br /> 
                        Suite 350, Vadodara, Gujarat
                    </p>
                    <p className='text-gray-500'>
                        Tel: (415) 555-0132 <br /> 
                        Email: support@fixit.com
                    </p>

                    <p className='font-semibold text-lg text-gray-600'>WORK WITH US</p>
                    <p className='text-gray-500'>Join our network of skilled workers and start getting bookings today.</p>
                    <button 
                        onClick={() => window.location.href = '/workers'} 
                        className='border border-black px-8 py-4 text-sm hover:bg-primary hover:text-white transition-all duration-500'
                    >
                        Become a Worker
                    </button>

                </div>
            </div>

        </div>
    );
};

export default Contact;
