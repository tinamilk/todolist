import React, { useState } from 'react';
import {
	useDeleteTaskMutation,
	useChangeTaskMutation,
} from '../../store/tasksApi/tasksApi';
import { useDispatch } from 'react-redux';
import { setModalActive } from '../../store/modal/modal';
import { ChangeTitleInput } from '../ChangeTitleInput/ChangeTitleInput';
import { MdDone } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti';
import { Box, Text, useMediaQuery, IconButton} from '@chakra-ui/react';

const options = {
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
	hour: '2-digit',
	minute: '2-digit',
	second: '2-digit',
};

export const Task = ({
	title,
	id,
	isDone,
	date,
	isEditInputDisabled,
	toggleEditInputDisabled,
}) => {

	const [deleteTask, { isUninitialized: isDeleteLoading }] =
		useDeleteTaskMutation();
	const [changeTask] = useChangeTaskMutation();
	const [isEditing, setIsEditing] = useState(false);
	const handleIsEditingChange = (value) => setIsEditing(value);
	const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
	const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)');


	const handleTitleSubmit = async(title) => {

		const now = new Date();

		const patch = {
			name: title,
			done: isDone,
			createdAt: date,
			updatedAt: now.toJSON(),
		};

		await changeTask({ id, patch })
			.unwrap()
			.then(() => {
				handleIsEditingChange();
				toggleEditInputDisabled(false);
			})
			.catch((error) => dispatch(setModalActive(error.data.message)));

	};

	const dispatch = useDispatch();

	const handleChangeIsDone = async () => {
		const now = new Date();

		const patch = {
			name: title,
			done: !isDone,
			createdAt: date,
			updatedAt: now.toJSON(),
		};

		await changeTask({ id, patch })
			.unwrap()
			.catch((error) => dispatch(setModalActive(error.data.message)));
	};

	const handleDeleteTask = async () => {
		toggleEditInputDisabled(false);
		await deleteTask(id)
			.unwrap()
			.catch((error) => dispatch(setModalActive(error.data.message)));
	};

	const handleDBClick = () => {
		if (isEditInputDisabled) return;
		toggleEditInputDisabled(true);
		setIsEditing(true);
	};

	return (
		<Box 
			display='flex'
			flexDirection='row'
			justifyContent='space-between'
			border='2px solid #115055'
			borderRadius='20px'
			padding='10px'
			margin='10px'>
			<IconButton
				colorScheme='blue'
				aria-label='Search database'
				icon={isDone && <MdDone/>}
				onClick={handleChangeIsDone}
				background={isDone ? '#e5989b' : '#edede9'}
				_hover={{
					background: '#FFCEC2'
				}}
				size={isLargerThan800 ? 'md' : 'xs'}
				marginRight='5px'
			/>
			
			<Box onClick={() => handleDBClick(id)}
				display='flex'
				justifyContent='space-between'
				minWidth='80%'>
				<ChangeTitleInput
					title={title}
					isDone={isDone}
					date={date}
					id={id}
					toggleEditInputDisabled={toggleEditInputDisabled}
					isEditing={isEditing}
					handleTitleSubmit={handleTitleSubmit}
					handleIsEditingChange={handleIsEditingChange}
				/>
				<Text fontSize={isLargerThan1000 ? 'lg' : 'xs'} marginRight='3px'>
					{new Date(date).toLocaleDateString(undefined, options)}
				</Text>
			</Box>
			<IconButton
				fontSize='lg'
				onClick={handleDeleteTask}
				disabled={!isDeleteLoading}
				icon={<TiDeleteOutline/>}
				size={isLargerThan800 ? 'md' : 'xs'}
				marginRight='5px'
			/>

		</Box>
	);
};
