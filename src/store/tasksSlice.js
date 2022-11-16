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
				.splice(state.findIndex(task => task.id === action.payload), 1);
		},
		sortTasksByDateNew: (state) => {
			state.sort((a, b) => b.date - a.date);
		},
		sortTasksByDateOld: (state) => {
			state.sort((a, b) => a.date - b.date);
		},
		setIsDone: (state, action) => {
			state[state.findIndex(task => task.id === action.payload)].isDone = 
				state[state.findIndex(task => task.id === action.payload)].isDone ?
					false : true;
		}
	},
});

export const { addTask, removeTask, sortTasksByDateNew,  sortTasksByDateOld, setIsDone} = tasksSlice.actions;

export default tasksSlice.reducer;