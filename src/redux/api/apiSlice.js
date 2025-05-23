import Cookies from "js-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const NEXT_PUBLIC_API_BASE_URL = 'https://apiv2.mysweetwishes.com/api/';

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      try {
        const userInfo = Cookies.get('cookies');
        

        if (userInfo) {
          const user = JSON.parse(userInfo);
          if (user?.accessToken) {
            headers.set("Authorization", `Bearer ${user.accessToken}`);
          }
        }
      } catch (error) {
       
      }
      return headers;
    },
  }),
  tagTypes: ["HeroSections", "Products", "UserOrders", "Product"],
  endpoints: (builder) => ({
    // Fetch Hero Slider data
    getHeroSliderData: builder.query({
      query: () => 'hero-sections',  // API endpoint for hero slider
      providesTags: ['HeroSections'],
    }),

    // Other example endpoints
    getProducts: builder.query({
      query: () => '/products',
      providesTags: ['Products'],
    }),

    getUserOrders: builder.query({
      query: () => '/user/orders',
      providesTags: ['UserOrders'],
    }),

    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ['Product'],
    }),
    searchProducts: builder.query({
      query: (query) => `products/search?query=${query}`,
      providesTags: ["Products"],
    }),
  }),
});

// Export hooks for the endpoints
export const { 
  useGetHeroSliderDataQuery, 
  useGetProductsQuery, 
  useGetUserOrdersQuery, 
  useGetProductByIdQuery ,
  useSearchProductsQuery,
} = apiSlice;
