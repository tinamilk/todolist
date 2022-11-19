import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const tasksApi = createApi({

	reducerPath: 'tasksApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://todo-api-learning.herokuapp.com/v1/tasks/4?' }),
	endpoints: (builder) => ({
		getTasks: builder.query({
			query: ({order, pp, page}) => `order=${order}&pp=${pp}&page=${page}`,
		}),
	}),
});
  

export const { useGetTasksQuery } = tasksApi;