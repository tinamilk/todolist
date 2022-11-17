import { createSlice } from '@reduxjs/toolkit';

const initialState =  {
	filtered: []
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setAll: (state, action) => {
			state.filtered = action.payload;
		},
		setDone: (state, action) => {
			state.filtered = action.payload.filter(task => task.isDone === true);
		},
		setUndone: (state, action) => {
			state.filtered = action.payload.filter(task => task.isDone === false);
		},

	},
});

export const { setAll, setDone, setUndone} = filterSlice.actions;

export default filterSlice.reducer;