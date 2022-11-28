import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAddTaskMutation } from '../../store/tasksApi/tasksApi';
import { setModalActive } from '../../store/modal/modal';
import { validateInput } from '../../helpers/validateInput';
import { Input, InputLeftElement, InputGroup, Stack } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';


export const AddTaskInput = () => {
	const [inputValue, setInputValue] = useState('');
	const [addTask] = useAddTaskMutation();

	const dispatch = useDispatch();

	const handleAddTitle = (e) => { setInputValue(e.target.value);};
	const handleAddTask = async() => {

		const now = new Date();
		const formatedDate = now.toJSON();

		if (validateInput(inputValue)) {

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

	return <Stack width='70%' height='40px'><InputGroup height='40px'>
		<InputLeftElement
			pointerEvents='none'
			height='40px'
			// eslint-disable-next-line react/no-children-prop
			children={<AddIcon/>}
		/>
		<Input
			className='search-input'
			placeholder='I want to...'
			onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
			onChange={(e) => handleAddTitle(e)}
			value={inputValue}
			autoFocus
			size='lg'
			border='2px solid #197278'
			borderRadius ='10px'
			height='40px'
			_focus={{
				border: '3px solid #197278',
				boxShadow: 'none'
			}}
			_hover={{
				border: '2px solid #197278'
			}}
		/>;</InputGroup>
	</Stack>;
};