import React, { useState } from 'react';
import delete_icon from '../../assets/img/delete_icon.svg';
import checked_icon from '../../assets/img//checked_icon.svg';
import './Task.css';
import close from '../../assets/img/close_icon.svg';
import { useDeleteTaskMutation, useChangeTaskMutation } from '../../store/tasksApi/tasksApi';
import { useDispatch } from 'react-redux';
import { setModalActive } from '../../store/modal/modal';
import { validateInput  } from '../../helpers/validateInput';

const options = {
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
	hour: '2-digit',
	minute: '2-digit',
	second: '2-digit',
};

export const Task = ({title, id, isDone, date, setChanging, changingTask }) => {

	const toggleClassName = isDone ? 'checkbox checked' : 'checkbox';
	const [deleteTask, {isUninitialized: isDeleteLoading}] = useDeleteTaskMutation();
	const [changeTask] = useChangeTaskMutation();
	const [currentTitle, setCurrentTitle] = useState(title);

	const dispatch = useDispatch();

	const handleChangeIsDone = async() => {

		const now = new Date();

		const patch = {
			'name': title,
			'done': !isDone,
			'createdAt': date,
			'updatedAt': now.toJSON()
		};

		await changeTask({id, patch})
			.unwrap()
			.catch((error) => dispatch(setModalActive(error.data.message)));
	};

	const handleChangeTitle = () => {
		setChanging(id);
	};

	const handleUnchangeTitle = () => {
		setChanging('');
	};

	const handleChangeTask = async(e) => {
		if (validateInput(e.target.value)) {
			const now = new Date();

			const patch = {
				'name': e.target.value,
				'done': isDone,
				'createdAt': date,
				'updatedAt': now.toJSON()
			};


			await changeTask({id, patch})
				.unwrap()
				.then(()=>{setChanging(''); setCurrentTitle(e.target.value);})
				.catch((error) => dispatch(setModalActive(error.data.message)));

		} else dispatch(setModalActive('No tasks to change'));
	};

	const handleKeyDown= (e) => {

		if (e.key === 'Escape') {
			setChanging(false);
		}
		if (e.key === 'Enter') {
			handleChangeTask(e);
		}
	};

	const handleDeleteTask = async() => {

		await deleteTask(id)
			.unwrap()
			.catch((error) => dispatch(setModalActive(error.data.message)));

	};


	return <div className='task'>
		<div
			className={toggleClassName}
			onClick={handleChangeIsDone}
		>
			{isDone && <img className='checked-icon' srcSet={checked_icon}/>}
		</div>
		<div className='task-data'>
			{changingTask === id ?
				<div className='changing_form'>
					<input
						autoFocus
						className='changing_input'
						defaultValue={title}
						onKeyDown={(e) => handleKeyDown(e)} />
					<img className='close_button' alt="close" srcSet={close} onClick={handleUnchangeTitle}/>
				</div>
				:
				<p className={'title'} onDoubleClick={handleChangeTitle}>
					{currentTitle}
				</p>
			}
			<p className='date'>{new Date(date).toLocaleDateString(undefined, options)}</p>
		</div><button className='delete-button'
			onClick={handleDeleteTask}
			disabled={!isDeleteLoading}
		>
			<img alt='delete' className='delete-icon' srcSet={delete_icon} />
		</button>
	</div>;
};
