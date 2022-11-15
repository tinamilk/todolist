import React from 'react';
import './Input.css';
import { addTask } from '../../store/tasksSlice';
import { useDispatch } from 'react-redux';


export const Input = () => {

	const dispatch = useDispatch();

	const handleAddTask = (e) => {
		dispatch(addTask(e.target.value));
		e.target.value = null;
	};

	return <input
		className='search_input'
		placeholder='I want to...'
		onKeyPress={(e) => e.key === 'Enter' && handleAddTask(e)}
	/>;
};