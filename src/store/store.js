import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './tasksSlice';
import  pageSlice  from './pageSlice';

export const store = configureStore({
	reducer: {
		tasks: tasksSlice,
		page: pageSlice,
	},
});