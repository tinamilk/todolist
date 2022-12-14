import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userName: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login(state, action) {
			state.userName = action.payload;
		},
		logout(state) {
			state.userName = '';
		},
	},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
