import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './tasks/tasksSlice';
import  pageSlice  from './page/pageSlice';

export const store = configureStore({
	reducer: {
		tasks: tasksSlice,
		page: pageSlice,
	},
});