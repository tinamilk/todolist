import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	sortByDate: 'asc',
	pp: 20,
	page: 1
};

export const tasksQuerySlice = createSlice({
	name: 'tasksQuery',
	initialState,
	reducers: {
		changeSorting: (state, action) => {
			state.sortByDate = action.payload;
		},
		changePage: (state, action) => {
			state.page = action.payload;
		}
	},
});

export const { changeSorting, changePage, setMustReload } = tasksQuerySlice.actions;

export default tasksQuerySlice.reducer;