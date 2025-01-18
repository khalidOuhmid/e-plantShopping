import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const handleRemoveItem = (name) => {
        dispatch(removeItem({ name }));
    };

    const handleQuantityChange = (name, newQuantity) => {
        dispatch(updateQuantity({ name, quantity: newQuantity }));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleCheckout = () => {
        alert('Coming Soon! Thank you for shopping with Paradise Nursery.');
    };

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                    <button onClick={onContinueShopping}>Continue Shopping</button>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.name} className="cart-item">
                                <img src={item.image} alt={item.name} />
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p>${item.price.toFixed(2)}</p>
                                </div>
                                <div className="quantity-controls">
                                    <button 
                                        onClick={() => handleQuantityChange(item.name, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button 
                                        onClick={() => handleQuantityChange(item.name, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
                                <button 
                                    className="remove-button"
                                    onClick={() => handleRemoveItem(item.name)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <div className="total">
                            <h3>Total: ${calculateTotal().toFixed(2)}</h3>
                            <p>Total Items: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}</p>
                        </div>
                        <div className="cart-buttons">
                            <button onClick={onContinueShopping}>Continue Shopping</button>
                            <button className="checkout-button" onClick={handleCheckout}>
                                Checkout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartItem;
