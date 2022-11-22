import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const tasksApi = createApi({

	reducerPath: 'tasksApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://todo-api-learning.herokuapp.com' }),
	tagTypes: ['Tasks'],
	endpoints: builder => ({
		getTasks: builder.query({
			query: ({sortByDate, pp, page, filter}) => `/v1/tasks/4?filterBy=${filter}&order=${sortByDate}&pp=${pp}&page=${page}`,
			providesTags: ['Tasks'],
		}),
		addTask: builder.mutation({
			query: (body) => ({
				url: '/v1/task/4',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Tasks'],
		}),
		deleteTask: builder.mutation({
			query: (id) => ({
				url: `/v1/task/4/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Tasks'],
		}),
		changeTask: builder.mutation({
			query: ({ id, patch }) => ({
				url: `/v1/task/4/${id}`,
				method: 'PATCH',
				body: patch,
			}),
			invalidatesTags: ['Tasks'],
		}),
	})
});
  

export const { useGetTasksQuery,
	useAddTaskMutation, 
	useDeleteTaskMutation,
	useChangeTaskMutation} = tasksApi;