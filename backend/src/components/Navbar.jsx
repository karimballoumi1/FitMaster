import React, { useState } from 'react'; 
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = ({ onGetStarted, isAuthenticated, setIsAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Utilisation de useNavigate pour la redirection

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false); // Met à jour l'état d'authentification
    navigate('/homepage'); // Redirige vers la page d'accueil
  };

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">FitMaster</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isAuthenticated && ( // Supprime "Home" si l'utilisateur est connecté
              <NavLink to="/homepage" className="text-gray-700 hover:text-blue-600 font-medium">
                Home
              </NavLink>
            )}
            {isAuthenticated && ( // Affiche ces liens uniquement si l'utilisateur est authentifié
              <>
                <NavLink to="/training" className="text-gray-700 hover:text-blue-600 font-medium">
                  Training
                </NavLink>
                <NavLink to="/nutritional" className="text-gray-700 hover:text-blue-600 font-medium">
                  Nutritional
                </NavLink>
                <NavLink to="/shop" className="text-gray-700 hover:text-blue-600 font-medium">
                  Shop
                </NavLink>
              </>
            )}
            <div className="ml-auto flex items-center space-x-8"> {/* Pousse les liens à droite */}
              {!isAuthenticated && ( // Affiche Signup et Login si l'utilisateur n'est pas authentifié
                <>
                  <NavLink to="/signup" className="text-gray-700 hover:text-blue-600 font-medium">
                    Signup
                  </NavLink>
                  <NavLink to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                    Login
                  </NavLink>
                </>
              )}
              {isAuthenticated && ( // Affiche un bouton Logout si l'utilisateur est authentifié
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Logout
                </button>
              )}
              <img src="/pp.png" className="h-10 w-15 rounded-full" />
              
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-blue-600">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {!isAuthenticated && ( // Supprime "Home" si l'utilisateur est connecté
                <NavLink
                  to="/home"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  Home
                </NavLink>
              )}
              {isAuthenticated && ( // Affiche ces liens uniquement si l'utilisateur est authentifié
                <>
                  <NavLink
                    to="/training"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  >
                    Training
                  </NavLink>
                  <NavLink
                    to="/nutritional"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  >
                    Nutritional
                  </NavLink>
                  <NavLink
                    to="/modelai"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  >
                    AI Model
                  </NavLink>
                </>
              )}
              {!isAuthenticated && ( // Affiche Signup et Login si l'utilisateur n'est pas authentifié
                <>
                  <NavLink
                    to="/signup"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  >
                    Signup
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  >
                    Login
                  </NavLink>
                </>
              )}
              {isAuthenticated && ( // Affiche un bouton Logout si l'utilisateur est authentifié
                <button
                  onClick={handleLogout} // Déconnecte l'utilisateur
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  Logout
                </button>
              )}
              <div className="px-3 py-2">
                <button
                  onClick={onGetStarted}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
