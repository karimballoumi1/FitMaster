import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import Cart from './Cart';
import { ShoppingCart, Star, Package, Truck, Shield, X, ChevronLeft } from 'lucide-react'; // Import X and ChevronLeft

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/app1/products/${id}/`);
                setProduct(response.data);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Error fetching product details");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const handleAddToCart = () => {
        if (!product) return;

        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[existingProductIndex].quantity += 1;
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }

        setIsCartOpen(true);
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity === 0) {
            removeFromCart(productId);
            return;
        }

        setCart(cart.map(item =>
            item.id === productId
                ? { ...item, quantity: newQuantity }
                : item
        ));
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#004aad]"></div>
        </div>
    );
    if (error) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-red-50 p-6 rounded-lg">
                <p className="text-red-500 font-medium">{error}</p>
            </div>
        </div>
    );
    if (!product) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-yellow-50 p-6 rounded-lg">
                <p className="text-yellow-600 font-medium">Product not found</p>
            </div>
        </div>
    );

    return (
        <>
            <Helmet>
                <title>{product.name} - Product Details</title>
            </Helmet>
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Cart Icon with Counter */}
                    <div className="fixed top-4 right-4 z-40">
                        <button
                            onClick={toggleCart}
                            className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow relative"
                        >
                            {isCartOpen ? (
                                <X className="w-6 h-6 text-[#004aad]" />
                            ) : (
                                <ShoppingCart className="w-6 h-6 text-[#004aad]" />
                            )}
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                                </span>
                            )}
                        </button>
                    </div>

                    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Image Section */}
                            <div className="relative h-96 lg:h-[600px] overflow-hidden">
                                <img
                                    src={product.image1.startsWith('http')
                                        ? product.image1
                                        : `http://127.0.0.1:8000/media/${product.image1}`}
                                    alt={product.name}
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                                    <div className="flex items-center space-x-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="text-sm font-medium">{product.rating || 4.5}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-8 lg:p-12 flex flex-col justify-between">
                                <div>
                                    <div className="mb-8">
                                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{product.name}</h1>
                                        <div className="flex items-center space-x-4 mb-6">
                                            <span className="text-3xl font-bold text-[#004aad]">{product.price}€</span>
                                            <span className="text-sm text-gray-500">Tax included</span>
                                        </div>
                                        <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
                                    </div>

                                    {/* Features */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                        <div className="flex items-center space-x-3">
                                            <Package className="w-6 h-6 text-[#004aad]" />
                                            <span className="text-sm text-gray-600">Free Returns</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Truck className="w-6 h-6 text-[#004aad]" />
                                            <span className="text-sm text-gray-600">Free Shipping</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Shield className="w-6 h-6 text-[#004aad]" />
                                            <span className="text-sm text-gray-600">2 Year Warranty</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* Stock Status */}
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span className="text-sm text-gray-600">In Stock</span>
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button
                                        onClick={handleAddToCart}
                                        className="w-full bg-[#004aad] text-white px-8 py-4 rounded-full hover:bg-[#003a8f] transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg"
                                    >
                                        <ShoppingCart className="w-6 h-6" />
                                        <span className="text-lg font-medium">Add to Cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cart Component */}
            <Cart
                isOpen={isCartOpen}
                onClose={toggleCart} // Use toggleCart to close
                cartItems={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
            />

            <Footer />
        </>
    );
};

export default ProductDetail;
