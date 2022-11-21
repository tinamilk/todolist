
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

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
			invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
		}),
	}),
});
  

export const { useGetTasksQuery, useAddTaskMutation } = tasksApi;