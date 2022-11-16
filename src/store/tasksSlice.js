import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (state, action) => {
			state.push(action.payload);
		},
		removeTask: (state, action) => {
			state
				.splice(state.findIndex(task=>task.id===action.payload), 1);
		}
	},
});

export const { addTask, removeTask } = tasksSlice.actions;

export default tasksSlice.reducer;