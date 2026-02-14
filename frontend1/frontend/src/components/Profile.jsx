import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Footer from './Footer';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Non authentifié');
                }

                const response = await axios.get('http://127.0.0.1:8000/app1/profile/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#004aad]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Profil - FitApp</title>
                <link rel="icon" href="/logo.png" />
            </Helmet>
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="px-6 py-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-8">Mon Profil</h1>
                            
                            {user && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-[#004aad] mb-4">
                                            Informations personnelles
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-600">
                                                    Nom d'utilisateur
                                                </label>
                                                <p className="mt-1 text-lg text-gray-900">{user.username}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-600">
                                                    Email
                                                </label>
                                                <p className="mt-1 text-lg text-gray-900">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-semibold text-[#004aad] mb-4">
                                            Statistiques
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-600">
                                                    Âge
                                                </label>
                                                <p className="mt-1 text-lg text-gray-900">{user.age} ans</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-600">
                                                    Taille
                                                </label>
                                                <p className="mt-1 text-lg text-gray-900">{user.height} cm</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-600">
                                                    Poids
                                                </label>
                                                <p className="mt-1 text-lg text-gray-900">{user.weight} kg</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-semibold text-[#004aad] mb-4">
                                            Objectif
                                        </h2>
                                        <p className="text-lg text-gray-900">{user.goal}</p>
                                    </div>

                                    <div className="pt-6">
                                        <button
                                            className="w-full bg-[#004aad] text-white py-3 px-6 rounded-lg hover:bg-[#003c8a] transition-colors"
                                            onClick={() => {
                                                // Logique pour modifier le profil
                                            }}
                                        >
                                            Modifier mon profil
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile; 