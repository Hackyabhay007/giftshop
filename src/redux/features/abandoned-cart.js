import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { getLocalStorage, setLocalStorage } from '@/utils/localstorage';
import { add_cart_product, clearCart } from '@/redux/features/cartSlice';
import CartPopup from '@/components/Cart_pop/CartPopup';

const BASE_URL = 'https://apiv2.mysweetwishes.com/api';

// Helper function to get the Authorization header
const getAuthHeader = (accessToken) => {
    return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
};

// Save Cart API
export const saveCart = async (cartItems, totalAmount, accessToken = null) => {
    try {
        let cartId = getLocalStorage('cart_id');
        if (!cartId && !accessToken) {
            cartId = `guest-${uuidv4()}`;
            setLocalStorage('cart_id', cartId);
        }

        const response = await axios.post(
            `${BASE_URL}/cart/save`,
            {
                cart_id: cartId,
                cart_items: cartItems,
                total_amount: totalAmount,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader(accessToken),
                },
            }
        );

        if (response.data.status === 'success') {
            setLocalStorage('cart_id', response.data.data.cart.cart_id || cartId);
            setLocalStorage('cart_products', cartItems);
            return response.data;
        }
    } catch (error) {
        console.error('Error saving cart:', error.response?.data || error.message);
        throw error;
    }
};

// Get Cart API
export const getCart = async (accessToken = null) => {
    try {
        const cartId = getLocalStorage('cart_id');
        if (!cartId && !accessToken) {
            return null;
        }

        const response = await axios.get(
            `${BASE_URL}/cart/get`,
            {
                headers: {
                    ...getAuthHeader(accessToken),
                },
                params: accessToken ? {} : { cart_id: cartId },
            }
        );

        if (response.data.status === 'success') {
            setLocalStorage('cart_products', response.data.data.cart.cart_items);
            return response.data.data.cart;
        }
    } catch (error) {
        console.error('Error fetching cart:', error.response?.data || error.message);
        throw error;
    }
};

// Find Abandoned Cart API
export const findAbandonedCart = async (cartId) => {
    try {
        const response = await axios.get(`${BASE_URL}/cart/find-abandoned`, {
            params: { id: cartId },
        });

        if (response.data.status === 'success') {
            setLocalStorage('cart_products', response.data.data.cart.cart_items);
            setLocalStorage('cart_id', response.data.data.cart.cart_id);
            return response.data.data.cart;
        }
    } catch (error) {
        console.error('Error finding abandoned cart:', error.response?.data || error.message);
        throw error;
    }
};

// Utility function to handle cart persistence on app open
export const initializeCart = async (accessToken = null) => {
    try {
        const cart = await getCart(accessToken);
        if (cart) {
            setLocalStorage('cart_products', cart.cart_items);
            setLocalStorage('cart_id', cart.cart_id || null);
            return cart; // Return cart data for use in popup logic
        }
        return null;
    } catch (error) {
        console.error('Error initializing cart:', error);
        return null;
    }
};

// Handle fetching cart by ID for /cart/:cartId route
export const fetchCartById = async (cartId, dispatch) => {
    try {
        const cart = await findAbandonedCart(cartId);
        if (cart) {
            dispatch(clearCart());
            cart.cart_items.forEach((item) => {
                dispatch(add_cart_product(item));
            });
        }
    } catch (error) {
        console.error('Error fetching cart by ID:', error);
    }
};

// Main Component to Trigger CartPopup
const AbandonedCart = ({ accessToken }) => {
    const [cart, setCart] = useState(null);
    const [showCartPopup, setShowCartPopup] = useState(false);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const cartData = await initializeCart(accessToken);
                if (cartData && cartData.cart_items.length > 0) {
                    setCart(cartData);
                    setShowCartPopup(true); // Show the popup if there are items in the cart
                }
            } catch (error) {
                console.error('Error initializing cart:', error);
            }
        };

        fetchCart();
    }, [accessToken]);

    const closeCartPopup = () => {
        setShowCartPopup(false);
    };
    const navigateToCart = () => {
        const cartId = getLocalStorage('cart_id');
        if (cartId) {
          history.push(`/cart/${cartId}`); // Navigate to the cart page with cartId
        }
      };
    
    return (
        <div>
            {showCartPopup && (
                <CartPopup cart={cart} onClose={closeCartPopup} />
            )}
        </div>
    );
};

export default AbandonedCart;

export const cartApi = {
    saveCart,
    getCart,
    findAbandonedCart,
    initializeCart,
    fetchCartById,
};
