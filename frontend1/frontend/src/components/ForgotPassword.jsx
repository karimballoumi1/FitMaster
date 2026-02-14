import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, ArrowRight, KeyRound } from 'lucide-react';
import { Helmet } from 'react-helmet';

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        code: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        try {
            console.log('Sending reset request for email:', formData.email);
            const response = await axios.post('http://127.0.0.1:8000/app1/request-password-reset/', {
                email: formData.email
            });
            
            console.log('Response:', response.data);
            
            if (response.data.status === 'success') {
                setSuccess('Reset code has been sent to your email');
                setStep(2);
            } else {
                setError(response.data.message || 'Failed to send reset code');
            }
        } catch (err) {
            console.error('Error details:', err.response?.data || err);
            setError(
                err.response?.data?.message || 
                'Failed to send reset code. Please try again.'
            );
        }
    };

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await axios.post('http://127.0.0.1:8000/app1/reset-password/', {
                email: formData.email,
                code: formData.code,
                new_password: formData.newPassword
            });
            setSuccess('Password has been reset successfully');
            setStep(3);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password');
        }
    };

    return (
        <>
            <Helmet>
                <title>Forgot Password - FitMaster</title>
            </Helmet>

            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {step === 1 && "Forgot Password"}
                                {step === 2 && "Reset Password"}
                                {step === 3 && "Password Reset Complete"}
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                {step === 1 && "Enter your email to receive a reset code"}
                                {step === 2 && "Enter the code sent to your email and your new password"}
                                {step === 3 && (
                                    <>
                                        Your password has been reset.{' '}
                                        <Link to="/login" className="font-medium text-[#004aad] hover:text-[#003c8a]">
                                            Sign in
                                        </Link>
                                    </>
                                )}
                            </p>
                        </div>

                        {step === 1 && (
                            <form onSubmit={handleEmailSubmit} className="space-y-6">
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

                                {error && (
                                    <div className="text-red-600 text-sm text-center">
                                        {error}
                                    </div>
                                )}

                                {success && (
                                    <div className="text-green-600 text-sm text-center">
                                        {success}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#004aad] hover:bg-[#003c8a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004aad]"
                                >
                                    Send Reset Code
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </button>
                            </form>
                        )}

                        {step === 2 && (
                            <form onSubmit={handleResetSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                                        Reset Code
                                    </label>
                                    <div className="mt-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <KeyRound className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="code"
                                            id="code"
                                            required
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#004aad] focus:border-[#004aad]"
                                            placeholder="Enter reset code"
                                            value={formData.code}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                        New Password
                                    </label>
                                    <div className="mt-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <KeyRound className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            id="newPassword"
                                            required
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#004aad] focus:border-[#004aad]"
                                            placeholder="Enter new password"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                        Confirm New Password
                                    </label>
                                    <div className="mt-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <KeyRound className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            required
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#004aad] focus:border-[#004aad]"
                                            placeholder="Confirm new password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="text-red-600 text-sm text-center">
                                        {error}
                                    </div>
                                )}

                                {success && (
                                    <div className="text-green-600 text-sm text-center">
                                        {success}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#004aad] hover:bg-[#003c8a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004aad]"
                                >
                                    Reset Password
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </button>
                            </form>
                        )}

                        {step === 3 && (
                            <div className="text-center">
                                <Link
                                    to="/login"
                                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#004aad] hover:bg-[#003c8a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004aad]"
                                >
                                    Return to Login
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </div>
                        )}

                        <div className="mt-6 text-center">
                            <Link to="/login" className="text-sm text-gray-600 hover:text-[#004aad]">
                                Back to login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword; 