/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import delete_icon from '../../assets/img/delete_icon.svg';
import checked_icon from '../../assets/img//checked_icon.svg';
import './Task.css';
import {
	useDeleteTaskMutation,
	useChangeTaskMutation,
} from '../../store/tasksApi/tasksApi';
import { useDispatch } from 'react-redux';
import { setModalActive } from '../../store/modal/modal';
import { ChangeTitleInput } from '../ChangeTitleInput/ChangeTitleInput';
import { useOutsideClick } from '@chakra-ui/react';

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
	const toggleClassName = isDone ? 'checkbox checked' : 'checkbox';
	const [deleteTask, { isUninitialized: isDeleteLoading }] =
		useDeleteTaskMutation();
	const [changeTask] = useChangeTaskMutation();

	const [isEditing, setIsEditing] = useState(false);
	const handleIsEditingChange = (value) => setIsEditing(value);
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
				toggleEditInputDisabled();
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
		await deleteTask(id)
			.unwrap()
			.catch((error) => dispatch(setModalActive(error.data.message)));
	};

	const handleDBClick = () => {
		if (isEditInputDisabled) return;
		toggleEditInputDisabled();
		setIsEditing(true);
	};

	const ref = React.useRef();
	useOutsideClick({
		ref: ref,
		handler: () => toggleEditInputDisabled(),
	});

	return (
		<div className="task">
			<div className={toggleClassName} onClick={handleChangeIsDone}>
				{isDone && <img className="checked-icon" srcSet={checked_icon} />}
			</div>
			<div ref={ref} className="task-data" onClick={() => handleDBClick(id)}>
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
				<p className="date">
					{new Date(date).toLocaleDateString(undefined, options)}
				</p>
			</div>
			<button
				className="delete-button"
				onClick={handleDeleteTask}
				disabled={!isDeleteLoading}
			>
				<img alt="delete" className="delete-icon" srcSet={delete_icon} />
			</button>
		</div>
	);
};
