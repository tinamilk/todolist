import { createSlice } from '@reduxjs/toolkit';

const initialState =  {
	filtered: [],
	currentFilter: ''
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setAll: (state, action) => {
			state.filtered = action.payload;
			state.currentFilter = 'all';
		},
		setDone: (state, action) => {
			state.filtered = action.payload.filter(task => task.isDone === true);
			state.currentFilter = 'done';
		},
		setUndone: (state, action) => {
			state.filtered = action.payload.filter(task => task.isDone === false);
			state.currentFilter = 'undone';
		},

	},
});

export const { setAll, setDone, setUndone} = filterSlice.actions;

export default filterSlice.reducer;