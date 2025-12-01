import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='md:mx-10'>
      {/* Main Footer Content */}
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        {/* Brand / Description Section */}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="FixIt Logo" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            FixIt connects local service providers with customers in need of skilled labor. 
            Book trusted workers for plumbing, electrical work, cleaning, tutoring, and more.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <p className='text-xl font-medium mb-5'>FIXIT</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Services</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91 8128860240</li>
            <li>support@fixit.com</li>
          </ul>
        </div>

      </div>

      {/* Copyright Section */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
          Copyright 2024 @ FixIt - All Right Reserved.
        </p>
      </div>

    </div>
  );
};

export default Footer;
