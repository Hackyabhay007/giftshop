import { apiSlice } from "../api/apiSlice";

const BaseUrl = "http://apiv2.mysweetwishes.com/api/products";
export const productApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => `${BaseUrl}`,
      providesTags: ["Products"],
    }),
    getProductType: builder.query({
      query: (type) => `${BaseUrl}/category/${type}`,
      providesTags: ["ProductType"],
    }),

    getOfferProducts: builder.query({
      query: (type) => `${BaseUrl}/offer?type=${type}`,
      providesTags: ["OfferProducts"],
    }),
    getPopularProductByType: builder.query({
      query: (type) => `${BaseUrl}/popular/${type}`,
      providesTags: ["PopularProducts"],
    }),
    getTopRatedProducts: builder.query({
      query: () => `${BaseUrl}/top-rated`,
      providesTags: ["TopRatedProducts"],
    }),
    // get single product
    getProduct: builder.query({
      query: (id) => `${BaseUrl}/${id}`,
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
      invalidatesTags: (result, error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
    }),
    //get related products
    getRelatedProducts: builder.query({
      query: (id) => {
        return `${BaseUrl}/category/${id}`;
      },
      providesTags: (result, error, arg) => [
        { type: "products", id: Number(arg) }, // Ensure arg is a number for the tag
      ],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductTypeQuery,
  useGetOfferProductsQuery,
  useGetPopularProductByTypeQuery,
  useGetTopRatedProductsQuery,
  useGetProductQuery,
  useGetRelatedProductsQuery,
} = productApi;
