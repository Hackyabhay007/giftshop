import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartById } from '@/utils/cartApi'; // The API call to fetch cart by ID
import { clearCart, add_cart_product } from '@/redux/features/cartSlice';
import CartItem from '@/components/CartItem'; // Your cart item component
import Loader from '@/components/Loader'; // A loader for showing the loading state

const CartById = () => {
  const router = useRouter();
  const { cartId } = router.query; // Get the `cartId` from the URL
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cart_products);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cartId) {
      const fetchCart = async () => {
        try {
          setLoading(true);
          // Fetch the cart by ID and populate Redux state
          await fetchCartById(cartId, dispatch);
        } catch (error) {
          console.error('Failed to fetch cart by ID:', error);
          alert('Unable to load the cart. Please try again later.');
          router.push('/'); // Redirect to the homepage or a fallback page
        } finally {
          setLoading(false);
        }
      };

      fetchCart();
    }
  }, [cartId, dispatch, router]);

  const handleCheckout = () => {
    // Navigate to checkout page
    router.push('/checkout');
  };

  if (loading) {
    return <Loader />;
  }

  if (!cartProducts || cartProducts.length === 0) {
    return <p className="text-center mt-10">This cart is empty or unavailable.</p>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-5">Your Cart</h1>
      <div className="cart-items grid grid-cols-1 gap-5">
        {cartProducts.map((product) => (
          <CartItem key={product.product_id} product={product} />
        ))}
      </div>
      <div className="mt-5 text-right">
        <button
          className="bg-blue-500 text-white px-5 py-2 rounded"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};
//abodned-cart.js
export default CartById;
