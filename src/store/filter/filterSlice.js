import { createSlice } from '@reduxjs/toolkit';

const initialState =  {
	filtered: [],
	currentFilter: 'ALL'
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setAll: (state, action) => {
			state.filtered = action.payload;
			state.currentFilter = 'ALL';
		},
		setDone: (state, action) => {
			state.filtered = action.payload.filter(task => task.isDone === true);
			state.currentFilter = 'DONE';
		},
		setUndone: (state, action) => {
			state.filtered = action.payload.filter(task => task.isDone === false);
			state.currentFilter = 'UNDONE';
		},

	},
});

export const { setAll, setDone, setUndone} = filterSlice.actions;

export default filterSlice.reducer;