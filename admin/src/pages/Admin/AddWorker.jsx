import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const AddWorker = () => {
    const [workerImg, setWorkerImg] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('1 Year');
    const [hourlyRate, setHourlyRate] = useState('');
    const [about, setAbout] = useState('');
    const [category, setCategory] = useState('Cleaning');
    const [skills, setSkills] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');

    const { backendUrl } = useContext(AppContext);
    const { aToken } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {

            if (!workerImg) {
                return toast.error('Image Not Selected');
            }

            const formData = new FormData();

            formData.append("image", workerImg);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("experience", experience);
            formData.append("hourlyRate", Number(hourlyRate));
            formData.append("about", about);
            formData.append("category", category);
            formData.append("skills", skills);
            formData.append("address", JSON.stringify({ line1: address1, line2: address2 }));

            // console log formdata            
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });

            const { data } = await axios.post(backendUrl + '/api/admin/add-worker', formData, { headers: { aToken } });
            if (data.success) {
                toast.success(data.message)
                setWorkerImg(null);
        	setName('');
        	setEmail('');
        	setPassword('');
        	setExperience('1 Year');
        	setHourlyRate('');
        	setAbout('');
        	setCategory('Cleaning');
        	setSkills('');
        	setAddress1('');
        	setAddress2('');
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }

    }

    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>
            <p className='mb-3 text-lg font-medium'>Add Worker</p>
            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>

                {/* Upload Image */}
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="worker-img">
                        <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={workerImg ? URL.createObjectURL(workerImg) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setWorkerImg(e.target.files[0])} type="file" name="" id="worker-img" hidden />
                    <p>Upload worker <br /> picture</p>
                </div>

                {/* Form Fields */}
                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                    {/* Left Column */}
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="name">Full Name</label>
                            <input 
                                id="name"
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='border rounded px-3 py-2'
                                placeholder='Name'
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="email">Worker Email</label>
                            <input 
                                id="email"
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='border rounded px-3 py-2'
                                placeholder='Email'
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="password">Set Password</label>
                            <input 
                                id="password"
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='border rounded px-3 py-2'
                                placeholder='Password'
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="experience">Experience</label>
                            <select 
                                id="experience"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)} 
                                className='border rounded px-2 py-2'
                            >
                                <option value="1 Year">1 Year</option>
                                <option value="2 Years">2 Years</option>
                                <option value="3 Years">3 Years</option>
                                <option value="4 Years">4+ Years</option>
                                <option value="5 Years">5+ Years</option>
                                <option value="6 Years">6+ Years</option>
                                <option value="8 Years">8+ Years</option>
                                <option value="9 Years">9+ Years</option>
                                <option value="10 Years">10+ Years</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="hourly-rate">Hourly Rate (₹)</label>
                            <input 
                                id="hourly-rate"
                                type="number" 
                                value={hourlyRate}
                                onChange={(e) => setHourlyRate(e.target.value)}
                                className='border rounded px-3 py-2'
                                placeholder='Hourly Rate'
                                required
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="category">Service Category</label>
                            <select 
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className='border rounded px-2 py-2'
                            >
                                <option value="Cleaning">Cleaning</option>
                                <option value="Electrician">Electrician</option>
                                <option value="Painter">Painter</option>
                                <option value="Plumber">Plumber</option>
                                <option value="Repairing">Repairing</option>
                                <option value="Transportation">Transportation</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="skills">Degree</label>
                            <input 
                                id="skills"
                                type="text" 
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                                className='border rounded px-3 py-2'
                                placeholder='Degree'
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="address1">Address Line 1</label>
                            <input 
                                id="address1"
                                type="text" 
                                value={address1}
                                onChange={(e) => setAddress1(e.target.value)}
                                className='border rounded px-3 py-2'
                                placeholder='Street, City, State'
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="address2">Address Line 2 (optional)</label>
                            <input 
                                id="address2"
                                type="text" 
                                value={address2}
                                onChange={(e) => setAddress2(e.target.value)}
                                className='border rounded px-3 py-2'
                                placeholder='Landmark, Apartment No.'
                            />
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className='mt-6'>
                    <label htmlFor="about" className='block mb-2'>About Worker</label>
                    <textarea 
                        id="about"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        className='w-full px-4 pt-2 border rounded' 
                        rows={5} 
                        placeholder='Write about the worker...' 
                        required
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                    type='submit' 
                    className='bg-primary px-10 py-3 mt-4 text-white rounded-full hover:bg-opacity-90 transition-all'
                >
                    Add Worker
                </button>
            </div>
        </form>
    );
};

export default AddWorker;



















