import React, { useState } from 'react';
import './Input.css';
import { useDispatch, useSelector } from 'react-redux';
import { setAll } from '../../store/filter/filterSlice';
import { useAddTaskMutation } from '../../store/tasksApi/tasksApi';

export const Input = () => {
	const initialValue = {
		'name': 'cheeeeeeck',
		'done': false,
		'createdAt': '2022-11-21T08:59:06.150Z',
		'updatedAt': '2022-11-21T08:59:06.150Z'
	};
	const [inputValue, setInputValue] = useState(initialValue);
	const [addTask, { isLoading } ] = useAddTaskMutation();

	const dispatch = useDispatch();
	const tasks = useSelector((state) => state.tasks);

	const handleAddTitle = (e) => { setInputValue(e.target.value); };



	const handleAddTask = async() => {

		try {
			if (inputValue.name && inputValue.name.split(' ').join('')) {
				await addTask(inputValue).unwrap();
				dispatch(setAll(tasks));
			}
		} catch (err) {
			console.log(err.message);
		}



		setInputValue('');

	};

	return <input
		className='search-input'
		placeholder='I want to...'
		onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
		onChange={(e) => handleAddTitle(e)}
		value={inputValue}
		autoFocus
	/>;
};