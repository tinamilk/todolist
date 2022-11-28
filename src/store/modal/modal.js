import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isActive: false,
	title: '',
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		setModalActive: (state, action) => {
			state.title = action.payload;
			state.isActive = true;
		},
		setInitial: () => initialState,
	},
});

export const { setModalActive, setInitial } = modalSlice.actions;

export default modalSlice.reducer;
