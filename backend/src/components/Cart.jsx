import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';

const Cart = ({ isOpen, onClose, cartItems, updateQuantity, removeFromCart }) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
            
            <div className="absolute right-0 top-0 h-full w-full md:w-96 bg-white shadow-xl transform transition-transform duration-300">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-4 border-b flex justify-between items-center bg-[#004aad] text-white">
                        <div className="flex items-center space-x-2">
                            <ShoppingBag className="w-6 h-6" />
                            <h2 className="text-xl font-semibold">Your Cart</h2>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-[#003a8f] rounded-full transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                <ShoppingBag className="w-16 h-16 mb-4" />
                                <p className="text-lg">Your cart is empty</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                                        <img
                                            src={item.image1.startsWith('http')
                                                ? item.image1
                                                : `http://127.0.0.1:8000/media/${item.image1}`}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-md"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                                            <p className="text-[#004aad] font-semibold">{item.price}€</p>
                                            
                                            <div className="flex items-center space-x-2 mt-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                                    className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                                        >
                                            <X className="w-5 h-5 text-gray-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer with Total */}
                    <div className="border-t p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-medium">Total</span>
                            <span className="text-2xl font-bold text-[#004aad]">{total.toFixed(2)}€</span>
                        </div>
                        <button
                            className="w-full bg-[#004aad] text-white py-3 rounded-full hover:bg-[#003a8f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={cartItems.length === 0}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
