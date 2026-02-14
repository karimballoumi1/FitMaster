import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { FaUser, FaEnvelope, FaLock, FaBirthdayCake, FaRuler, FaWeightHanging, FaBullseye } from 'react-icons/fa';

const Signup = ({ setIsAuthenticated }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: '',
        height: '',
        weight: '',
        goal: 'maintain'
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/app1/signup/', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            setIsAuthenticated(true);
            navigate('/training');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during registration');
        }
    };

    return (
        <>
            <Helmet>
                <title>SignUp</title>
                <link rel="icon" href="/logo.png" />
            </Helmet>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Form Section */}
                        <div className="md:w-2/3 p-8">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Create your account
                                </h2>
                                <p className="mt-2 text-sm text-gray-600">
                                    Already have an account?{' '}
                                    <Link to="/login" className="font-medium text-[#004aad] hover:text-[#003c8a]">
                                        Sign in
                                    </Link>
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                            Username
                                        </label>
                                        <div className="mt-1 relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                name="username"
                                                id="username"
                                                required
                                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#004aad] focus:border-[#004aad]"
                                                placeholder="Enter your username"
                                                value={formData.username}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

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
                                                placeholder="Create a password"
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                            Confirm Password
                                        </label>
                                        <div className="mt-1 relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                required
                                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#004aad] focus:border-[#004aad]"
                                                placeholder="Confirm your password"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                                            Age
                                        </label>
                                        <div className="mt-1 relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaBirthdayCake className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="number"
                                                name="age"
                                                id="age"
                                                required
                                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#004aad] focus:border-[#004aad]"
                                                placeholder="Enter your age"
                                                value={formData.age}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                                            Height (cm)
                                        </label>
                                        <div className="mt-1 relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaRuler className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="number"
                                                name="height"
                                                id="height"
                                                required
                                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#004aad] focus:border-[#004aad]"
                                                placeholder="Enter your height"
                                                value={formData.height}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                                            Weight (kg)
                                        </label>
                                        <div className="mt-1 relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaWeightHanging className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="number"
                                                name="weight"
                                                id="weight"
                                                required
                                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#004aad] focus:border-[#004aad]"
                                                placeholder="Enter your weight"
                                                value={formData.weight}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
                                            Goal
                                        </label>
                                        <div className="mt-1 relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaBullseye className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <select
                                                name="goal"
                                                id="goal"
                                                required
                                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#004aad] focus:border-[#004aad]"
                                                value={formData.goal}
                                                onChange={handleChange}
                                            >
                                                <option value="maintain">Maintain</option>
                                                <option value="lose_weight">Lose Weight</option>
                                                <option value="gain_muscle">Gain Muscle</option>
                                            </select>
                                        </div>
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
                                    Sign up
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </button>
                            </form>
                        </div>

                        {/* Image Section */}
                        <div className="md:w-1/3 relative">
                            <img
                                className="h-full w-full object-cover"
                                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"
                                alt="Healthy food background"
                            />
                            <div className="absolute inset-0 bg-[#004aad] mix-blend-multiply opacity-60"></div>
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
                                <h2 className="text-3xl font-bold mb-4 text-center">Join Our Healthy Community</h2>
                                <p className="text-lg text-center">
                                    Get access to personalized meal plans and workout routines.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
