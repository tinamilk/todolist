import React, { useState } from 'react';
import './Input.css';
import { useDispatch, useSelector } from 'react-redux';
import { setAll } from '../../store/filter/filterSlice';
import { useAddTaskMutation } from '../../store/tasksApi/tasksApi';

export const Input = () => {
	const [inputValue, setInputValue] = useState('');
	const [addTask, { isLoading } ] = useAddTaskMutation();

	console.log(isLoading);

	const dispatch = useDispatch();
	const tasks = useSelector((state) => state.tasks);

	const handleAddTitle = (e) => { setInputValue(e.target.value);};
	const handleAddTask = async() => {

		const now = new Date();
		const formatedDate = now.toJSON();

		try {
			if (inputValue && inputValue.split(' ').join('')) {

				const body = {
					'name': inputValue,
					'done': false,
					'createdAt': formatedDate,
					'updatedAt': formatedDate
				};

				await addTask(body).unwrap();
				dispatch(setAll(tasks));
			} else console.log('empty');
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