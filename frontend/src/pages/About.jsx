import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
    return (
        <div>

            {/* Page Title */}
            <div className='text-center text-2xl pt-10 text-[#707070]'>
                <p>ABOUT <span className='text-gray-700 font-semibold'>US</span></p>
            </div>

            {/* About Section */}
            <div className='my-10 flex flex-col md:flex-row gap-12 px-4 md:px-0'>
                <img 
                    className='w-full md:max-w-[360px]' 
                    src={assets.about_image} 
                    alt="About FixIt"
                />
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
                    <p>
                        Welcome to FixIt, your trusted partner in connecting with skilled local workers for all your everyday needs.
                        At FixIt, we understand how challenging it can be to find reliable service providers quickly and securely.
                        Whether it's an emergency repair or a regular home service, our platform is designed to simplify your life.
                    </p>
                    <p>
                        We're committed to excellence in service technology. Our system helps you discover verified workers,
                        book them hassle-free, and manage job details seamlessly. Whether it's your first booking or you're looking
                        for regular maintenance help, FixIt is here to support you every step of the way.
                    </p>
                    <b className='text-gray-800'>Our Vision</b>
                    <p>
                        Our vision at FixIt is to build a seamless experience for hiring local professionals.
                        We aim to bridge the gap between customers and skilled workers, making it easier to get quality service — whenever and wherever you need it.
                    </p>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className='text-xl my-4 px-4 md:px-0'>
                <p>WHY  <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
            </div>

            <div className='flex flex-col md:flex-row mb-20 gap-6 md:gap-0'>
                <div className='border px-10 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
                    <b>TRUST:</b>
                    <p>All our workers are verified and rated by real users.</p>
                </div>
                <div className='border px-10 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
                    <b>HASSLE-FREE BOOKING:</b>
                    <p>Book any service with just a few clicks — no phone calls needed.</p>
                </div>
                <div className='border px-10 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
                    <b>AFFORDABLE & FLEXIBLE:</b>
                    <p>Choose from a wide range of services and budgets — available when you need them.</p>
                </div>
            </div>

        </div>
    );
};

export default About;
