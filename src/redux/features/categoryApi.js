import { apiSlice } from "../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (data) => ({
        url: "http://apiv2.mysweetwishes.com/api/categories",
        method: "POST",
        body: data,
      }),
    }),
    getShowCategory: builder.query({
      query: () => `http://apiv2.mysweetwishes.com/api/categories`,
    }),
    getProductTypeCategory: builder.query({
      query: (type) =>
        `http://apiv2.mysweetwishes.com/api/products/categories/${type}`,
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetProductTypeCategoryQuery,
  useGetShowCategoryQuery,
} = categoryApi;
