import React, { useState } from 'react';
import './Input.css';
import { addTask } from '../../store/tasks/tasksSlice';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';
import { setAll } from '../../store/filter/filterSlice';


export const Input = () => {

	const [inputValue, setInputValue] = useState('');

	const dispatch = useDispatch();
	const tasks = useSelector((state) => state.tasks);

	const handleAddTitle = (e) => {
		if (e.target.value) {
			setInputValue(e.target.value);
			console.log(inputValue);
		}
	};

	const handleAddTask = () => {

		const now = new Date();

		const taskData = {
			id: uuid(),
			title: inputValue,
			date: now.getTime(),
			isDone: false
		};

		if (inputValue) {
			dispatch(addTask(taskData));
			dispatch(setAll(tasks));
			setInputValue('');
		}

	};

	return <input
		className='search-input'
		placeholder='I want to...'
		onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
		onChange={(e) => handleAddTitle(e)}
		maxLength={60}
		value={inputValue}
	/>;
};