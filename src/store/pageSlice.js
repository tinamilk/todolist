import { createSlice } from '@reduxjs/toolkit';

const initialState = 1;

export const pagesSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setPage: (state, action) => {
			state = action.payload;
		}
	},
});

export const { setPage } = pagesSlice.actions;

export default pagesSlice.reducer;