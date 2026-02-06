import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsAuthenticated, setLoading, setUser } from "../features/userSlice";
import UpdateUser from "../../components/admin/UpdateUser";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["User", "AdminUsers", "AdminUser"],

  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => "/me",
      transformResponse: (result) => result.user,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setIsAuthenticated(true));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(setLoading(false));
        }
      },
      providesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query: (body) => ({
        url: "/me/update",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    updatePassword: builder.mutation({
      query: (body) => ({
        url: "/password/update",
        method: "POST",
        body,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/password/forgot",
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ token, body }) => {
        return {
          url: `/password/reset/${token}`,
          method: "PUT",
          body,
        }
      },
    }),
    getAdminUsers: builder.query({
      query: () => `/admin/users`,
      providesTags: ["AdminUsers"]
    }),
    getUserDetails: builder.query({
      query: (id) => `/admin/users/${id}`,
      providesTags: ["AdminUser"]
    }),
    updateUser: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `/admin/users/${id}`,
          method: "PUT",
          body,
        }
      },
      invalidatesTags: ["AdminUsers"]
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/admin/users/${id}`,
          method: "DELETE",
        }
      },
      invalidatesTags: ["AdminUsers"]
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetAdminUsersQuery,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
