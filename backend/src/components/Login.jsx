import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet';

const Login = ({ setIsAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/app1/login/', formData);
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            setIsAuthenticated(true);
            navigate('/training');
        } catch (err) {
            setError(err.response?.data?.detail || 'Invalid credentials');
        }
    };

    return (
        <>
            <Helmet>
                <title>Login - FitMaster</title>
            </Helmet>

            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Image Section */}
                        <div className="md:w-1/2 relative">
                            <img
                                className="h-full w-full object-cover"
                                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"
                                alt="Workout background"
                            />
                            <div className="absolute inset-0 bg-[#004aad] mix-blend-multiply opacity-60"></div>
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
                                <h2 className="text-3xl font-bold mb-4 text-center">Welcome Back!</h2>
                                <p className="text-lg text-center max-w-md">
                                    Continue your journey to a healthier lifestyle.
                                </p>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="md:w-1/2 p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Sign in to your account
                                </h2>
                                <p className="mt-2 text-sm text-gray-600">
                                    Don't have an account yet?{' '}
                                    <Link to="/signup" className="font-medium text-[#004aad] hover:text-[#003c8a]">
                                        Sign up
                                    </Link>
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            required
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#004aad] focus:border-[#004aad]"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            required
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#004aad] focus:border-[#004aad]"
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 text-[#004aad] focus:ring-[#004aad] border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="text-sm">
                                        <Link to="/forgot-password" className="font-medium text-[#004aad] hover:text-[#003c8a]">
                                            Forgot password?
                                        </Link>
                                    </div>
                                </div>

                                {error && (
                                    <div className="text-red-600 text-sm text-center">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#004aad] hover:bg-[#003c8a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004aad]"
                                >
                                    Sign in
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </button>
                            </form>

                         
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
