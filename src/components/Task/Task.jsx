import React from 'react';
import delete_icon from '../../assets/img/delete_icon.svg';
import checked_icon from '../../assets/img//checked_icon.svg';
import './Task.css';
import { useDispatch } from 'react-redux';
import { removeTask, setIsDone } from '../../store/tasks/tasksSlice';

export const Task = ({title, id, isDone, date}) => {

	const dispatch = useDispatch();
	const toggleClassName = isDone ? 'checkbox checked' : 'checkbox';

	const handleChangeIsDone = () => {
		dispatch(setIsDone(id));
	};


	const formatedDate = new Date(date);


	return <div className='task'>
		<div
			className={toggleClassName}
			onClick={handleChangeIsDone}
		>
			{isDone && <img className='checked-icon' srcSet={checked_icon}/>}
		</div>
		<div className='task-data'>
			<p className={'title'}>
				{title}
			</p>
			<p className='date'>{formatedDate.toLocaleString()}</p>
		</div>
		<div className='delete-button'
			onClick={()=>dispatch(removeTask(id))}
		>
			<img className='delete-icon' srcSet={delete_icon}/>
		</div>
	</div>;
};