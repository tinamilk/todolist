import React, { useState } from 'react';
import delete_icon from '../../assets/img/delete_icon.svg';
import checked_icon from '../../assets/img//checked_icon.svg';
import './Task.css';
import { useDispatch } from 'react-redux';
import { removeTask, setIsDone, changeTitle } from '../../store/tasks/tasksSlice';
import close from '../../assets/img/close_icon.svg';

export const Task = ({title, id, isDone, date}) => {

	const dispatch = useDispatch();
	const toggleClassName = isDone ? 'checkbox checked' : 'checkbox';
	const [isChanging, setIsChanging] = useState(false);

	const handleChangeIsDone = () => {
		dispatch(setIsDone(id));
	};


	const formatedDate = new Date(date);

	const handleChangeTitle = () => {
		setIsChanging(true);
	};

	const handleUnchangeTitle = () => {
		setIsChanging(false);
	};

	const handleChangeTask = (e) => {
		if (e.target.value && e.target.value.split(' ').join('')) {
			dispatch(changeTitle({
				id: id,
				newTitle: e.target.value
			}));
			setIsChanging(false);
		}
	};

	const handleKeyDown= (e) => {

		if (e.key === 'Escape') {
			setIsChanging(false);
		}
		if (e.key === 'Enter') {
			handleChangeTask(e);
		}
	};


	return <div className='task'
		onDoubleClick={handleChangeTitle}>
		<div
			className={toggleClassName}
			onClick={handleChangeIsDone}
		>
			{isDone && <img className='checked-icon' srcSet={checked_icon}/>}
		</div>
		<div className='task-data'>
			{isChanging ?
				<>
					<input
						autoFocus
						className='changing_input'
						defaultValue={title}
						onKeyDown={(e) => handleKeyDown(e)} />
					<img src={close} className='close_button' alt="close" srcSet="" onClick={handleUnchangeTitle}/>
				</>
				:
				<p className={'title'}>
					{title}
				</p>
			}
			<p className='date'>{formatedDate.toLocaleString()}</p>
		</div><div className='delete-button'
			onClick={() => dispatch(removeTask(id))}
		>
			<img className='delete-icon' srcSet={delete_icon} />
		</div>
	</div>;
};