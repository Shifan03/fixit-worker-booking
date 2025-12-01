import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { WorkerContext } from '../../context/WorkerContext';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const WorkerProfile = () => {
    const { wToken, profileData: initialProfileData, getProfileData, setProfileData } = useContext(WorkerContext);
    const { currencySymbol, backendUrl } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);
    const [localData, setLocalData] = useState(initialProfileData || {
        name: '',
        category: '',
        hourlyRate: 0,
        address: { line1: '', line2: '' },
        about: '',
        available: false,
        skills: [],
        image: ''
    });

    // Sync local state with context profileData
    useEffect(() => {
        if (initialProfileData) {
            setLocalData(initialProfileData);
        }
    }, [initialProfileData]);

    // Handle input changes
    const handleChange = (field, value) => {
        setLocalData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Update worker profile on server
    const updateProfile = async () => {
        try {
            const response = await axios.post(
                `${backendUrl}/api/workers/update-profile`,
                {
                    hourlyRate: localData.hourlyRate,
                    address: JSON.stringify(localData.address),
                    about: localData.about,
                    available: localData.available,
                    skills: localData.skills,
                },
                { headers: { wToken } } // ✅ Kept as wToken (no change)
            );

            if (response.data.success) {
                toast.success(response.data.message);
                setProfileData(response.data.profileData); // Update context
                setIsEdit(false);
            } else {
                toast.error(response.data.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Update Profile Error:", error.message);
            toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    // Fetch profile on mount
    useEffect(() => {
        if (wToken && !initialProfileData) {
            getProfileData();
        }
    }, [wToken, initialProfileData]);

    // Show loader while fetching
    if (!initialProfileData) {
        return (
            <div className="p-5 text-center">
                <p>Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="p-5">
            {/* Worker Image & Name */}
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <img
                    src={localData.image}
                    alt={`${localData.name}'s Profile`}
                    className='w-full sm:w-auto max-w-xs rounded-lg'
                />
                <div className="mt-4 sm:mt-0">
                    <h2 className="text-2xl font-semibold">{localData.name}</h2>
                    <p className="text-sm text-gray-600 mt-1">Category: {localData.category}</p>
                </div>
            </div>

            {/* Profile Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Name</label>
                    <input
                        type="text"
                        value={localData.name || ''}
                        onChange={(e) => handleChange('name', e.target.value)}
                        disabled={!isEdit}
                        className="border rounded px-3 py-2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Category</label>
                    <input
                        type="text"
                        value={localData.category || ''}
                        onChange={(e) => handleChange('category', e.target.value)}
                        disabled={!isEdit}
                        className="border rounded px-3 py-2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Hourly Rate</label>
                    <input
                        type="number"
                        value={localData.hourlyRate || 0}
                        onChange={(e) => handleChange('hourlyRate', e.target.value)}
                        disabled={!isEdit}
                        className="border rounded px-3 py-2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Availability</label>
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={localData.available}
                            onChange={(e) => handleChange('available', e.target.checked)}
                            disabled={!isEdit}
                            className="cursor-pointer"
                        />
                        <span>{localData.available ? 'Available for new bookings' : 'Not Available'}</span>
                    </label>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Skills (comma-separated)</label>
                    <input
                        type="text"
                        value={localData.skills?.join(", ") || ""}
                        onChange={(e) => handleChange('skills', e.target.value.split(",").map(s => s.trim()))}
                        disabled={!isEdit}
                        className="border rounded px-3 py-2"
                        placeholder="e.g., Plumbing, Painting"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">About</label>
                    <textarea
                        value={localData.about || ''}
                        onChange={(e) => handleChange('about', e.target.value)}
                        disabled={!isEdit}
                        className="border rounded px-3 py-2"
                        rows={4}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Address Line 1</label>
                    <input
                        value={localData.address?.line1 || ''}
                        onChange={(e) => handleChange('address', {
                            ...localData.address,
                            line1: e.target.value
                        })}
                        disabled={!isEdit}
                        className="border rounded px-3 py-2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Address Line 2 (optional)</label>
                    <input
                        value={localData.address?.line2 || ''}
                        onChange={(e) => handleChange('address', {
                            ...localData.address,
                            line2: e.target.value
                        })}
                        disabled={!isEdit}
                        className="border rounded px-3 py-2"
                    />
                </div>
            </div>

            {/* Edit/Save Button */}
            <div className="mt-6">
                {isEdit ? (
                    <button
                        onClick={updateProfile}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-all"
                    >
                        Save Changes
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEdit(true)}
                        className="px-4 py-2 border border-primary rounded-md hover:bg-primary hover:text-white transition-all"
                    >
                        Edit Profile
                    </button>
                )}
            </div>
        </div>
    );
};

export default WorkerProfile;