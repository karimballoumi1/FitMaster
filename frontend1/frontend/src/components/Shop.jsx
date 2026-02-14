import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Star, Filter, Timer, Info, X, Menu } from 'lucide-react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart'; // Import the Cart component

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState("All Products");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]); // State to manage cart items
    const navigate = useNavigate();

    // Récupérer les catégories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/app1/product-categories/");
                setCategories(response.data);
            } catch (err) {
                console.error("Error fetching categories:", err);
                setError("Erreur lors du chargement des catégories");
            }
        };

        fetchCategories();
    }, []);

    // Récupérer les produits
    useEffect(() => {
        if (categories.length === 0) return;

        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/app1/products/");
                const productsWithCategoryName = response.data.map(product => ({
                    ...product,
                    categoryName: product.category
                        ? categories.find(cat => cat.id === product.category)?.name || "Sans catégorie"
                        : "Sans catégorie"
                }));
                setProducts(productsWithCategoryName);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Erreur lors du chargement des produits");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categories]);

    // Filtrage des produits
    const filteredProducts = filter === "All Products"
        ? products
        : products.filter(product =>
            product.categoryName && product.categoryName === filter
        );

    // Toggle cart visibility
    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    // Add item to cart
    const addToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    // Update quantity in cart
    const updateQuantity = (productId, newQuantity) => {
        setCartItems(cartItems.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        ).filter(item => item.quantity > 0));
    };

    // Remove item from cart
    const removeFromCart = (productId) => {
        setCartItems(cartItems.filter(item => item.id !== productId));
    };

    if (loading) {
        return (
            <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#004aad]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center text-red-500">
                {error}
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Shop</title>
                <link rel="icon" href="/logo.png" />
            </Helmet>
            <div className="p-6 bg-gray-100 min-h-screen">
                {/* Navbar Section */}
                <div className="flex justify-between items-center mb-4 bg-white p-4 shadow-md">
                    <h1 className="text-3xl font-bold text-[#004aad]">
                        Notre Boutique Fitness
                    </h1>

                    {/* Cart Icon */}
                    <button onClick={toggleCart} className="relative">
                        {isCartOpen ? <X className="w-8 h-8 text-[#004aad]" /> : <ShoppingCart className="w-8 h-8 text-[#004aad]" />}
                        {cartItems.length > 0 && (
                            <span className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full px-2 text-xs">
                                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                            </span>
                        )}
                    </button>
                </div>
                {/* End Navbar Section */}
               
                {/* Cart (Panier) */}
                <div className={`mb-4 ${isCartOpen ? 'block' : 'hidden'}`}>
                    <Cart
                        isOpen={true} // Always true because it's now part of the layout
                        onClose={toggleCart}
                        cartItems={cartItems}
                        updateQuantity={updateQuantity}
                        removeFromCart={removeFromCart}
                    />
                </div>
                <img src="" alt="" />


                

                {/* Filtres de catégories */}
                <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
                    <button
                        className={`px-4 py-2 rounded-full whitespace-nowrap ${filter === "All Products" ? "bg-[#004aad] text-white" : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        onClick={() => setFilter("All Products")}
                    >
                        Tous les produits
                    </button>
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`px-4 py-2 rounded-full whitespace-nowrap ${filter === category.name ? "bg-[#004aad] text-white" : "bg-gray-200 hover:bg-gray-300"
                                }`}
                            onClick={() => setFilter(category.name)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Product Grid Container */}
                <div className="flex justify-center"> {/* Center the grid horizontally */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-[100rem] w-full"> {/* Limit the width and make it responsive */}
                        {filteredProducts.map(product => (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition duration-300"
                            >
                                {/* Centering the image container */}
                                <div className="relative h-48 flex items-center justify-center" onClick={() => navigate(`/product/${product.id}`)}>
                                    <div className="w-[10rem] h-full">
                                        {product.image1 ? (
                                            <img
                                                src={product.image1.startsWith('http')
                                                    ? product.image1
                                                    : `http://127.0.0.1:8000/media/${product.image1}`}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://via.placeholder.com/400x400/e2e8f0/1a202c?text=No+Image';
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-500">Pas d'image disponible</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-gray-900 truncate">
                                        {product.name}
                                    </h2>
                                    <p className="text-gray-600 mt-1 text-sm truncate">
                                        {product.description}
                                    </p>
                                    <p className="text-gray-500 mt-1 text-xs">
                                        {product.categoryName}
                                    </p>

                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <span className="ml-2 font-bold text-[#004aad]">
                                                {product.price}€
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                            <span className="ml-1 text-gray-600">
                                                {product.rating || 4.5}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="mt-4 w-full bg-[#004aad] text-white py-2 rounded-full hover:bg-[#003a8f] transition-colors"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Message si aucun produit */}
                {filteredProducts.length === 0 && (
                    <div className="text-center text-gray-600 py-8">
                        Aucun produit ne correspond à la catégorie sélectionnée.
                    </div>
                )}
            <img src="https://cdn.muscleandstrength.com/store/media/wysiwyg/Home_Slider/2025/03/nutrex_slider_desktop.jpg" alt="" className=" w-full mb-6 mt-10 ml-25"/>

            </div>

            <Footer />
        </>
    );
};

export default Shop;
