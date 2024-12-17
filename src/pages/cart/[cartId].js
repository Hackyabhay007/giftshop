import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// The API call to fetch cart by ID
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import Wrapper from "@/layout/wrapper";
import CartArea from "@/components/cart-wishlist/cart-area";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import {
  ViewCartClear,
  bulk_add_cart_product,
} from "@/redux/features/cartSlice";
import { findAbandonedCart } from "@/redux/features/abandoned-cart";

import Loader from "@/components/loader/loader"; // A loader for showing the loading state

const CartById = () => {
  const router = useRouter();
  const { cartId } = router.query; // Get the `cartId` from the URL

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const fetchCart = async () => {
    try {
      dispatch(ViewCartClear());
      setLoading(true);

      const CartProducts = await findAbandonedCart(cartId);
      setProducts(CartProducts.data.cart.items);
      if (
        CartProducts &&
        CartProducts.data &&
        CartProducts.data.cart &&
        CartProducts.data.cart.items
      ) {
        CartProducts.data.cart.items.forEach((item) => {
          console.log("Adding item to cart:", item.product);
          dispatch(bulk_add_cart_product(item.product));
        });
      } // Replace this with actual logic
    } catch (err) {
      console.error("Failed to fetch cart by ID:", err);
      setError("Unable to load the cart. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Hooks must always be executed, avoid early returns!
  useEffect(() => {
    if (cartId) {
      fetchCart();
    }
  }, [cartId]);

  if (error) {
    return <p>{error}</p>;
  }
  console.log("fetchcart", products);

  if (loading) {
    return <Loader />;
  }

  if (!products || products.length === 0) {
    return (
      <p className="text-center mt-10">This cart is empty or unavailable.</p>
    );
  }

  return (
    <Wrapper>
      <SEO pageTitle="Cart" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Shopping Cart" subtitle="Shopping Cart" />
      <CartArea />
      <Footer primary_style={true} />
    </Wrapper>
  );
};
//abodned-cart.js
export default CartById;
