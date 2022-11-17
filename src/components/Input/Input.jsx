import React from 'react';
import './Input.css';
import { addTask } from '../../store/tasks/tasksSlice';
import { useDispatch } from 'react-redux';
import uuid from 'react-uuid';


export const Input = () => {

	const dispatch = useDispatch();

	const handleAddTask = (e) => {
		if (e.target.value) {

			const now = new Date();

			const taskData = {
				id: uuid(),
				title: e.target.value,
				date: now.getTime(),
				isDone: false
			};

			dispatch(addTask(taskData));
			e.target.value = null;
		}
	};

	return <input
		className='search-input'
		placeholder='I want to...'
		onKeyPress={(e) => e.key === 'Enter' && handleAddTask(e)}
	/>;
};