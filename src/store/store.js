import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './tasks/tasksSlice';
import  pageSlice  from './page/pageSlice';
import  filterSlice  from './filter/filterSlice';

export const store = configureStore({
	reducer: {
		tasks: tasksSlice,
		page: pageSlice,
		filter: filterSlice
	},
});