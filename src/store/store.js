import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './tasks/tasksSlice';
import  pageSlice  from './page/pageSlice';
import  filterSlice  from './filter/filterSlice';
import { tasksApi } from './tasksApi/tasksApi';
import tasksQuery from './tasksQuery/tasksQuery';

export const store = configureStore({
	reducer: {
		[tasksApi.reducerPath]: tasksApi.reducer,
		tasks: tasksSlice,
		page: pageSlice,
		filter: filterSlice,
		tasksQuery: tasksQuery
	},
	middleware: (getDefaultMiddleware) => 
		getDefaultMiddleware()
			.concat(tasksApi.middleware)
});
