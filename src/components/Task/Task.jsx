import React from 'react';
import delete_icon from '../../assets/img/delete_icon.svg';
import checked_icon from '../../assets/img//checked_icon.svg';
import './Task.css';
import close from '../../assets/img/close_icon.svg';
import { useDeleteTaskMutation, useChangeTaskMutation } from '../../store/tasksApi/tasksApi';
import { useDispatch } from 'react-redux';
import { setModalActive } from '../../store/modal/modal';

export const Task = ({title, id, isDone, date, setChanging, changingTask }) => {

	const toggleClassName = isDone ? 'checkbox checked' : 'checkbox';
	const [deleteTask, {isUninitialized}] = useDeleteTaskMutation();
	const [changeTask] = useChangeTaskMutation();

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
		if (e.target.value && e.target.value.split(' ').join('')) {
			const now = new Date();

			const patch = {
				'name': e.target.value,
				'done': isDone,
				'createdAt': date,
				'updatedAt': now.toJSON()
			};

			await changeTask({id, patch})
				.unwrap()
				.then(()=>setChanging(''))
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
			{changingTask === id?
				<>
					<input
						autoFocus
						className='changing_input'
						defaultValue={title}
						onKeyDown={(e) => handleKeyDown(e)} />
					<img className='close_button' alt="close" srcSet={close} onClick={handleUnchangeTitle}/>
				</>
				:
				<p className={'title'} onDoubleClick={handleChangeTitle}>
					{title}
				</p>
			}
			<p className='date'>{date}</p>
		</div><button className='delete-button'
			onClick={handleDeleteTask}
			disabled={!isUninitialized}
		>
			<img alt='delete' className='delete-icon' srcSet={delete_icon} />
		</button>
	</div>;
};