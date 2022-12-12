/* eslint-disable no-undef */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url =
	process.env.REACT_APP_NODE_ENV === 'development'
		? process.env.REACT_APP_LOCAL_URL
		: process.env.REACT_APP_EXT_URL;

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({ baseUrl: `${url}/auth` }),
	tagTypes: ['User'],
	endpoints: (build) => ({
		signup: build.mutation({
			query(body) {
				return {
					url: '/signup',
					method: 'POST',
					body,
				};
			},
			invalidatesTags: ['User'],
		}),
		signin: build.mutation({
			query: (body) => ({
				url: '/signin',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['User'],
		}),
	}),
});

export const { useSignupMutation, useSigninMutation } = userApi;
