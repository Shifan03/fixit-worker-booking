import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(null);

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext);

    // Ensure userData has default values
    const safeUserData = userData || {
        name: '',
        email: '',
        phone: '',
        gender: 'Not Selected',
        dob: '',
        address: { line1: '', line2: '' },
        image: ''
    };

    // Function to update user profile using API
    const updateUserProfile = async () => {
        try {
            const formData = new FormData();
            formData.append('name', safeUserData.name);
            formData.append('phone', safeUserData.phone);
            formData.append('address', JSON.stringify(safeUserData.address));
            formData.append('gender', safeUserData.gender);
            formData.append('dob', safeUserData.dob);

            if (image) {
                formData.append('image', image);
            }

            const response = await axios.post(`${backendUrl}/api/customer/update-profile`, formData, {
                headers: { token },
            });

            if (response.data.success) {
                toast.success("Profile Updated Successfully");
                await loadUserProfileData();
                setIsEdit(false);
                setImage(null);
            } else {
                toast.error(response.data.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className='max-w-lg flex flex-col gap-2 text-sm pt-5'>
            {/* Profile Image */}
            {isEdit ? (
                <label htmlFor="image" className='inline-block relative cursor-pointer'>
                    <img 
                        src={image ? URL.createObjectURL(image) : safeUserData.image} 
                        alt="User" 
                        className='w-36 rounded opacity-75' 
                    />
                    <img 
                        src={assets.upload_icon} 
                        alt="Upload" 
                        className='w-10 absolute bottom-12 right-12' 
                    />
                    <input 
                        type="file" 
                        id="image" 
                        onChange={(e) => setImage(e.target.files[0])} 
                        hidden 
                    />
                </label>
            ) : (
                <img 
                    src={safeUserData.image} 
                    alt={`${safeUserData.name}'s Profile`} 
                    className='w-36 rounded'
                />
            )}

            {/* Name Field */}
            {isEdit ? (
                <input 
                    className='bg-gray-50 text-3xl font-medium max-w-60 outline-none border-b py-1 mb-4' 
                    type="text" 
                    onChange={(e) => setUserData(prev => ({
                        ...prev,
                        name: e.target.value
                    }))}
                    value={safeUserData.name || ''}
                />
            ) : (
                <p className='font-medium text-3xl text-[#262626] mt-4'>{safeUserData.name}</p>
            )}

            <hr className='bg-[#ADADAD] h-[1px] border-none my-4' />

            {/* Contact Information */}
            <div>
                <h3 className='text-gray-600 underline mt-3 mb-2'>CONTACT INFORMATION</h3>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 text-[#363636]'>
                    <p className='font-medium'>Email:</p>
                    <p className='text-blue-500'>{safeUserData.email}</p>

                    <p className='font-medium'>Phone:</p>
                    {isEdit ? (
                        <input 
                            className='bg-gray-50 max-w-52 outline-none border-b py-1' 
                            type="text" 
                            onChange={(e) => setUserData(prev => ({
                                ...prev,
                                phone: e.target.value
                            }))}
                            value={safeUserData.phone || ''}
                        />
                    ) : (
                        <p className='text-blue-500'>{safeUserData.phone || 'N/A'}</p>
                    )}

                    <p className='font-medium'>Address:</p>
                    {isEdit ? (
                        <div>
                            <input 
                                className='bg-gray-50 w-full mb-2 outline-none border-b py-1' 
                                type="text" 
                                placeholder="Line 1" 
                                onChange={(e) => setUserData(prev => ({
                                    ...prev,
                                    address: {
                                        ...prev.address,
                                        line1: e.target.value
                                    }
                                }))}
                                value={safeUserData.address?.line1 || ''}
                            />
                            <input 
                                className='bg-gray-50 w-full outline-none border-b py-1' 
                                type="text" 
                                placeholder="Line 2 (optional)" 
                                onChange={(e) => setUserData(prev => ({
                                    ...prev,
                                    address: {
                                        ...prev.address,
                                        line2: e.target.value
                                    }
                                }))}
                                value={safeUserData.address?.line2 || ''}
                            />
                        </div>
                    ) : (
                        <p className='text-gray-500'>
                            {safeUserData.address?.line1 || 'No Address'} <br /> 
                            {safeUserData.address?.line2 || ''}
                        </p>
                    )}
                </div>
            </div>

            {/* Basic Information */}
            <div>
                <h3 className='text-gray-600 underline mt-5 mb-2'>BASIC INFORMATION</h3>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 text-gray-600'>
                    <p className='font-medium'>Gender:</p>
                    {isEdit ? (
                        <select 
                            className='max-w-32 bg-gray-50 outline-none border-b py-1' 
                            onChange={(e) => setUserData(prev => ({
                                ...prev,
                                gender: e.target.value
                            }))}
                            value={safeUserData.gender || 'Not Selected'}
                        >
                            <option value="Not Selected">Not Selected</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    ) : (
                        <p className='text-gray-500'>{safeUserData.gender || 'Not Selected'}</p>
                    )}

                    <p className='font-medium'>Date of Birth:</p>
                    {isEdit ? (
                        <input 
                            className='max-w-40 bg-gray-50 outline-none border-b py-1' 
                            type="date" 
                            onChange={(e) => setUserData(prev => ({
                                ...prev,
                                dob: e.target.value
                            }))}
                            value={safeUserData.dob || ''}
                        />
                    ) : (
                        <p className='text-gray-500'>{safeUserData.dob || 'Not Set'}</p>
                    )}
                </div>
            </div>

            {/* Edit / Save Button */}
            <div className='mt-8'>
                {isEdit ? (
                    <button 
                        onClick={updateUserProfile}
                        type="button"
                        className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300'
                    >
                        Save Information
                    </button>
                ) : (
                    <button 
                        onClick={() => setIsEdit(true)} 
                        className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300'
                    >
                        Edit Profile
                    </button>
                )}
            </div>
        </div>
    );
};

export default MyProfile;