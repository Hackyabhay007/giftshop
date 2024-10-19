import { apiSlice } from "../../api/apiSlice";
import { set_client_secret } from "./orderSlice";
import { v4 as uuidv4 } from 'uuid';  // Import UUID for generating unique idempotency keys

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createRazorpayOrder: builder.mutation({
      query: (orderInfo) => {
        const { accessToken, ...rest } = orderInfo;
        const idempotencyKey = uuidv4(); // Generate a new UUID as idempotency key
        return {
          url: "https://apiv2.mysweetwishes.com/api/initiate-order",
          method: "POST",
          body: rest,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "Idempotency-Key": idempotencyKey, // Include the idempotency key
          },
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("Razorpay order created successfully:", result.data);
          dispatch(set_client_secret(result.data.clientSecret));
        } catch (error) {
          console.error("Error creating Razorpay order:", error);
          console.error("Error details:", error.error);
        }
      },
    }),

    saveOrder: builder.mutation({
      query: (data) => {
        const { accessToken, ...rest } = data;
        const idempotencyKey = uuidv4(); // Generate a new UUID as idempotency key
        return {
          url: "https://apiv2.mysweetwishes.com/api/initiate-order",
          method: "POST",
          body: rest,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "Idempotency-Key": idempotencyKey, // Include the idempotency key
          },
        };
      },
      invalidatesTags: ["UserOrders"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            localStorage.removeItem("couponInfo");
            localStorage.removeItem("cart_products");
            localStorage.removeItem("shipping_info");
          }
        } catch (error) {
          console.error("Error saving order:", error);
        }
      },
    }),

    getUserOrders: builder.query({
      query: (accessToken) => ({
        url: "https://apiv2.mysweetwishes.com/api/user/orders",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      providesTags: ["UserOrders"],
      keepUnusedDataFor: 600,
    }),

    getUserOrderById: builder.query({
      query: ({ id, accessToken }) => ({
        url: `https://apiv2.mysweetwishes.com/api/orders/${id}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      providesTags: (result, error, arg) => [{ type: "UserOrder", id: arg.id }],
      keepUnusedDataFor: 600,
    }),

    cancelOrder: builder.mutation({
      query: ({ order_id, accessToken }) => ({
        url: "https://apiv2.mysweetwishes.com/api/cancel-order",
        method: "POST",
        body: { order_id },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["UserOrders"],
    }),

    trackOrder: builder.query({
      query: ({ orderId, accessToken }) => ({
        url: `https://apiv2.mysweetwishes.com/api/orders/${orderId}/track`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      providesTags: (result, error, arg) => [{ type: "OrderTrack", id: arg.orderId }],
      keepUnusedDataFor: 600,
    }),
  }),
});

export const {
  useCreateRazorpayOrderMutation,
  useSaveOrderMutation,
  useGetUserOrderByIdQuery,
  useGetUserOrdersQuery,
  useCancelOrderMutation,
  useTrackOrderQuery,
} = authApi;
