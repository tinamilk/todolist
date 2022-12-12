/* eslint-disable no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';
import modal from './modal/modal';
import { tasksApi } from './tasksApi/tasksApi';
import { userApi } from './userApi/userApi';
import tasksQuery from './tasksQuery/tasksQuery';
import { reHydrateStore, localStorageMiddleware } from './authMidlware/authMidleware';
import authSlice from './authSlice/authSlice';

export const store = configureStore({
	reducer: {
		[tasksApi.reducerPath]: tasksApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		tasksQuery: tasksQuery,
		modal: modal,
		authSlice: authSlice.reducer,
	},
	preloadedState: reHydrateStore(),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(tasksApi.middleware).concat(userApi.middleware).concat(localStorageMiddleware)
});
