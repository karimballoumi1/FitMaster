import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Training from './components/Training';
import ExerciseDetail from './components/ExerciseDetail';
import Modelai from './components/Modelai';
import Footer from './components/Footer';
import Nutritional from './components/Nutritional';
import RecipeDetail from './components/RecipeDetail';
import ForgotPassword from './components/ForgotPassword';
import Shop from './components/Shop';
import ProductDetail from './components/ProductDetail';
import ResetPassword from './components/ResetPassword';
import Profile from './components/Profile';
import Voice from './components/Voice'; // Import the Voice component

// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // Check for token in localStorage on initial load
        return !!localStorage.getItem('access_token');
    });

    const handleGetStarted = () => {
        alert('Get Started clicked!');
    };

    useEffect(() => {
        // You can add logic here to verify the token's validity with the backend
        // and update isAuthenticated accordingly.
        // For example, send a request to a /verify-token endpoint.
    }, []);

    return (
        <Router>
            <Navbar
                onGetStarted={handleGetStarted}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
            />
            <div className="pt-16 relative"> {/* Add relative positioning here */}
                <Routes>
                    <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route
                        path="/training"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Training />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/exercise/:id"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <ExerciseDetail />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/nutritional"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Nutritional />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/recipe/:id"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <RecipeDetail />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/shop"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Shop />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/product/:id"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <ProductDetail />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/" element={<Homepage />} />
                    <Route path="/homepage" element={<Homepage />} />
                    <Route
                        path="/modelai"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Modelai />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />

                </Routes>
                <div className="fixed bottom-4 right-4 z-50"> {/* Add a div for styling */}
                    <Voice /> {/* Add the Voice component here */}
                </div>
            </div>
        </Router>
    );
};

export default App;
