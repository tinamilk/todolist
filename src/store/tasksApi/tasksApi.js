import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tasksApi = createApi({
	reducerPath: 'tasksApi',
	baseQuery: fetchBaseQuery({ baseUrl: window.env.URL }),
	tagTypes: ['Tasks'],
	endpoints: (builder) => ({
		getTasks: builder.query({
			query: (params) =>
				`/v1/tasks/4?filterBy=${params.filter}&order=${params.sortByDate}&pp=${params.pp}&page=${params.page}`,
			providesTags: ['Tasks'],
		}),
		addTask: builder.mutation({
			query: (body) => ({
				url: `/v1/task/${window.env.USER_ID}`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Tasks'],
		}),
		deleteTask: builder.mutation({
			query: (id) => ({
				url: `/v1/task/${window.env.USER_ID}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Tasks'],
		}),
		changeTask: builder.mutation({
			query: ({ id, patch }) => ({
				url: `/v1/task/${window.env.USER_ID}/${id}`,
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
