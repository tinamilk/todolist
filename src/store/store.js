import { configureStore } from '@reduxjs/toolkit';
import modal from './modal/modal';
import { tasksApi } from './tasksApi/tasksApi';
import tasksQuery from './tasksQuery/tasksQuery';

export const store = configureStore({
	reducer: {
		[tasksApi.reducerPath]: tasksApi.reducer,
		tasksQuery: tasksQuery,
		modal: modal,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(tasksApi.middleware),
});
