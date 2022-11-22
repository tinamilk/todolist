import { configureStore } from '@reduxjs/toolkit';
import { tasksApi } from './tasksApi/tasksApi';
import tasksQuery from './tasksQuery/tasksQuery';

export const store = configureStore({
	reducer: {
		[tasksApi.reducerPath]: tasksApi.reducer,
		tasksQuery: tasksQuery
	},
	middleware: (getDefaultMiddleware) => 
		getDefaultMiddleware()
			.concat(tasksApi.middleware)
});
