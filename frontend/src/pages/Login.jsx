import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formState, setFormState] = useState('Sign Up'); // Can be "Sign Up" or "Login"

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { backendUrl, token, setToken } = useContext(AppContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (formState === 'Sign Up') {

      const { data } = await axios.post(backendUrl + '/api/customer/register', { name, email, password });

      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } else {
        toast.error(data.message);
      }

    } else {

      const { data } = await axios.post(backendUrl + '/api/customer/login', { email, password });

      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } else {
        toast.error(data.message);
      }

    }

  };

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token]);

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl font-semibold'>{formState === 'Sign Up' ? 'Create Account' : 'Login'}</p>
                <p>Please {formState === 'Sign Up' ? 'sign up' : 'log in'} to hire local workers</p>

                {formState === 'Sign Up' && (
                    <div className='w-full'>
                        <p>Full Name</p>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='border border-[#DADADA] rounded w-full p-2 mt-1'
                            required
                        />
                    </div>
                )}

                <div className='w-full'>
                    <p>Email</p>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border border-[#DADADA] rounded w-full p-2 mt-1'
                        required
                    />
                </div>

                <div className='w-full'>
                    <p>Password</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border border-[#DADADA] rounded w-full p-2 mt-1'
                        required
                    />
                </div>

                <button type="submit" className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>
                    {formState === 'Sign Up' ? 'Create account' : 'Login'}
                </button>

                {formState === 'Sign Up' ? (
                    <p>
                        Already have an account?{' '}
                        <span onClick={() => setFormState('Login')} className='text-primary underline cursor-pointer'>
                            Login here
                        </span>
                    </p>
                ) : (
                    <p>
                        Don't have an account?{' '}
                        <span onClick={() => setFormState('Sign Up')} className='text-primary underline cursor-pointer'>
                            Sign up here
                        </span>
                    </p>
                )}
            </div>
        </form>
    );
};

export default Login;