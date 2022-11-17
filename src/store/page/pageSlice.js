import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentPage: 1,
	currentItems: []
};

export const pageSlice = createSlice({
	name: 'page',
	initialState,
	reducers: {
		setPage: (state, action) => {
			state.currentPage = action.payload;
		},
		setItems: (state, action) => {
			state.currentItems = action.payload;
		}
	},
});

export const { setPage, setItems } = pageSlice.actions;

export default pageSlice.reducer;