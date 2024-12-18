import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  useCreateRazorpayOrderMutation,
  useSaveOrderMutation,
} from "@/redux/features/order/orderApi";
import { set_shipping } from "@/redux/features/order/orderSlice";
import { useMatchCouponMutation } from "@/redux/features/coupon/couponApi";
import useCartInfo from "./use-cart-info";
import { notifyError, notifySuccess } from "@/utils/toast";

const useCheckoutSubmit = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const couponRef = useRef(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderIdForModal, setOrderIdForModal] = useState(null);

  const { accessToken, user } = useSelector((state) => state.auth);
  const { cart_products } = useSelector((state) => state.cart);
  const { shipping_info } = useSelector((state) => state.order);
  const { total } = useCartInfo();

  const [createRazorpayOrder] = useCreateRazorpayOrderMutation();
  const [saveOrder] = useSaveOrderMutation();
  const [matchCoupon] = useMatchCouponMutation();

  const [couponInfo, setCouponInfo] = useState();
  const [cartTotal, setCartTotal] = useState(total);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplyMsg, setCouponApplyMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    watch,
    reset,
  } = useForm();

  const handleCouponCode = async (event) => {
    event.preventDefault();

    if (!couponRef.current || !couponRef.current.value) {
      setCouponApplyMsg("Please enter a coupon code.");
      return;
    }

    const couponCode = couponRef.current.value;
    setCouponInfo(couponCode);
    try {
      const response = await matchCoupon({ couponCode }).unwrap();
      console.log("resp", response);
      if (response.valid) {
        if (total >= response.min_price) {
          setCouponApplyMsg(
            `Coupon applied successfully! Discount: ${parseFloat(
              parseFloat(response.discount).toFixed(2)
            )}%`
          );
          setDiscountAmount(parseFloat(response.discount));
        } else {
          setCouponApplyMsg(
            `Coupon is valid but requires a minimum total of ₹${response.min_price}.`
          );
        }
      } else {
        setCouponApplyMsg("Coupon is not valid.");
      }
    } catch (error) {
      setCouponApplyMsg(`Failed to apply coupon: ${error.message}`);
    }
  };

  useEffect(() => {
    const discountTotal = discountAmount || 0;
    const totalValue = Math.max(Number(total) - discountTotal, 0);
    setCartTotal(totalValue);
  }, [total, discountAmount]);

  useEffect(() => {
    if (shipping_info) {
      setValue("firstName", shipping_info.firstName);
      setValue("lastName", shipping_info.lastName);
      setValue("country", shipping_info.country);
      setValue("address", shipping_info.address);
      setValue("city", shipping_info.city);
      setValue("state", shipping_info.state);
      setValue("zipCode", shipping_info.zipCode);
      setValue("contactNo", shipping_info.contactNo);
      setValue("email", shipping_info.email);
    }
  }, [shipping_info, setValue]);

  const submitHandler = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    dispatch(set_shipping(data));

    const products = cart_products
      .map((product) => ({
        product_id: product.product_id,
        quantity: product.orderQuantity,
        price: product.price,
      }))
      .filter(
        (product) => product.product_id && product.quantity && product.price
      );

    if (products.length === 0) {
      notifyError("No valid products in cart.");
      setIsSubmitting(false);
      return;
    }

    const orderInfo = {
      products,
      email: data.email,
      address: data.address,
      state: data.state,
      city: data.city,
      pincode: data.zipCode,
      country: "India",
      phone_number: data.contactNo,
      price: cartTotal,
      payment_type: data.payment,
      coupon_used: couponInfo || null,
      first_name: data.firstName,
      last_name: data.lastName,
      accessToken,
    };

    try {
      if (data.payment === "online") {
        await handlePaymentWithRazorpay(orderInfo);
        console.log("handlecoupon", orderInfo);
      } else if (data.payment === "cod") {
        const res = await saveOrder(orderInfo).unwrap();
        console.log("handlecouponcod", orderInfo);
        if (res?.order_id) {
          localStorage.removeItem("cart_products");
          setOrderIdForModal(res.order_id);
          reset();
          setShowSuccessModal(true);
        } else {
          notifyError("Error saving order. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error during order submission:", error);
      notifyError("There was an error placing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentWithRazorpay = async (orderInfo) => {
    try {
      console.log("order info", orderInfo);
      console.log("Initiating Razorpay order with info:", orderInfo);
      const orderResponse = await createRazorpayOrder(orderInfo).unwrap();
      console.log("Received order response:", orderResponse);

      if (!orderResponse || orderResponse.status !== "success") {
        console.error("Invalid order response:", orderResponse);
        throw new Error("Failed to initiate payment: Invalid server response");
      }

      const options = {
        key: "rzp_live_2sTBLvpxef5qxP",
        amount: orderResponse.amount,
        currency: "INR",
        name: "MySweetWishes",
        description: "Order Payment",
        order_id: orderResponse.razorpay_order_id,
        handler: async (response) => {
          await verifyAndSaveOrder(response, orderInfo);
        },
        prefill: {
          name: `${orderInfo.first_name} ${orderInfo.last_name}`,
          email: orderInfo.email,
          contact: orderInfo.phone_number,
        },
        notes: {
          address: orderInfo.address,
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error in handlePaymentWithRazorpay:", error);
      notifyError(`Failed to initiate payment: ${error.message}`);
      throw error;
    }
  };

  const verifyAndSaveOrder = async (response, orderInfo) => {
    try {
      const verifyResponse = await fetch(
        "https://apiv2.mysweetwishes.com/api/verifypayment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${orderInfo.accessToken}`,
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        }
      );

      const verifyData = await verifyResponse.json();

      if (verifyData.status === "success") {
        notifySuccess("Your payment has been verified successfully!");
        localStorage.removeItem("cart_products");
        router.push(`/order/${verifyData.order_id}`);
      } else {
        notifyError("Payment verification failed. Please contact support.");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      notifyError(
        "Payment verification request failed. Please contact support."
      );
    }
  };

  return {
    register,
    handleCouponCode,
    handleSubmit,
    submitHandler,
    formState: { errors }, // Return the entire formState object with errors
    couponApplyMsg,
    cartTotal,
    discountAmount,
    couponRef,
    setError,
    isSubmitting,
    watch,
    setValue,
    reset,
    showSuccessModal,
    setShowSuccessModal,
    orderIdForModal,
  };
};

export default useCheckoutSubmit;
