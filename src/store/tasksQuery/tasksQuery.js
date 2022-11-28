import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	sortByDate: 'desc',
	pp: 5,
	page: 1,
	filter: '',
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
		},
		setFilter: (state, action) => {
			state.filter = action.payload;
		},
	},
});

export const { changeSorting, changePage, setMustReload, setFilter } =
	tasksQuerySlice.actions;

export default tasksQuerySlice.reducer;
