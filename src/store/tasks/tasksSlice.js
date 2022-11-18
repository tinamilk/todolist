import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (state, action) => {
			state.unshift(action.payload);
		},
		removeTask: (state, action) => {
			state
				.splice(state.findIndex(task => task.id === action.payload), 1);
		},
		sortTasksByDateNew: (state) => {
			state.sort((a, b) => b.date - a.date);
		},
		sortTasksByDateOld: (state) => {
			state.sort((a, b) => a.date - b.date);
		},
		setIsDone: (state, action) => {
			const index = state.findIndex(task => task.id === action.payload);
			state[index].isDone = state[index].isDone ? false : true; 
		}, 
		changeTitle: ((state, action) => {
			const index = state.findIndex(task => task.id === action.payload.id);
			state[index].title = action.payload.newTitle;
		})
	},
});

export const { addTask, removeTask, sortTasksByDateNew,  sortTasksByDateOld, setIsDone, changeTitle} = tasksSlice.actions;

export default tasksSlice.reducer;