
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
//https://todo-api-learning.herokuapp.com/v1/task/4/90b52d7a-3447-48ac-ac7d-e34085c42e23
export const tasksApi = createApi({

	reducerPath: 'tasksApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://todo-api-learning.herokuapp.com' }),
	endpoints: builder => ({
		getTasks: builder.query({
			query: ({sortByDate, pp, page}) => `/v1/tasks/4?order=${sortByDate}&pp=${pp}&page=${page}`,
		}),
		addTask: builder.mutation({
			query: (body) => ({
				url: '/v1/task/4',
				method: 'POST',
				body,
			}),
		}),
		deleteTask: builder.mutation({
			query: (id) => ({
				url: `/v1/task/4/${id}`,
				method: 'DELETE',
			}),
		}),
		changeTask: builder.mutation({
			query: ({ id, patch }) => ({
				url: `/v1/task/4/${id}`,
				method: 'PATCH',
				body: patch,
			}),
		}),
	})
});
  

export const { useGetTasksQuery,
	useAddTaskMutation, 
	useDeleteTaskMutation,
	useChangeTaskMutation} = tasksApi;