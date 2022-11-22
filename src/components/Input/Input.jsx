import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Input.css';
import { useAddTaskMutation } from '../../store/tasksApi/tasksApi';
import { setModalActive } from '../../store/modal/modal';

export const Input = () => {
	const [inputValue, setInputValue] = useState('');
	const [addTask] = useAddTaskMutation();

	const dispatch = useDispatch();

	const handleAddTitle = (e) => { setInputValue(e.target.value);};
	const handleAddTask = async() => {

		const now = new Date();
		const formatedDate = now.toJSON();

		if (inputValue && inputValue.split(' ').join('')) {

			const body = {
				'name': inputValue,
				'done': false,
				'createdAt': formatedDate,
				'updatedAt': formatedDate
			};

			await addTask(body).unwrap().catch((error) => dispatch(setModalActive(error.data.message)));
		} else dispatch(setModalActive('No task to add :('));


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