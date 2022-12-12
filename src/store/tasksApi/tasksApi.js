/* eslint-disable no-undef */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url =
	process.env.REACT_APP_NODE_ENV === 'development'
		? process.env.REACT_APP_LOCAL_URL
		: process.env.REACT_APP_EXT_URL;

export const tasksApi = createApi({
	reducerPath: 'tasksApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${url}/tasks/`,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem('token');

			if (token) {
				headers.set('authorization', `Bearer ${token}`);
			}

			return headers;
		},
	}),
	tagTypes: ['Tasks'],
	endpoints: (builder) => ({
		getTasks: builder.query({
			query: (params) =>
				`?filterBy=${params.filter}&order=${params.sortByDate}&pp=${params.pp}&page=${params.page}`,
			providesTags: ['Tasks'],
		}),
		addTask: builder.mutation({
			query: (body) => ({
				url: '/',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Tasks'],
		}),
		deleteTask: builder.mutation({
			query: (id) => ({
				url: id,
				method: 'DELETE',
			}),
			invalidatesTags: ['Tasks'],
		}),
		changeTask: builder.mutation({
			query: ({ id, patch }) => ({
				url: id,
				method: 'PATCH',
				body: patch,
			}),
			invalidatesTags: ['Tasks'],
		}),
	}),
});

export const {
	useGetTasksQuery,
	useAddTaskMutation,
	useDeleteTaskMutation,
	useChangeTaskMutation,
} = tasksApi;
