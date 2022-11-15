import React, { useState } from 'react';
import delete_icon from './img/delete_icon.svg';
import checked_icon from './img/checked_icon.svg';
import './Task.css';
import { useDispatch } from 'react-redux';
import { removeTask } from '../../store/tasksSlice';

export const Task = ({title}) => {

	const dispatch = useDispatch();

	const [isDone, setIsDone] = useState(false);
	const toggleClassName = isDone ? 'checkbox checked' : 'checkbox';


	return <div className='task'>
		<div
			className={toggleClassName}
			onClick={() => setIsDone(!isDone)}
		>
			{isDone && <img className='checked_icon' srcSet={checked_icon}/>}
		</div>
		<div className='task_data'>
			<p className='title'>{title}</p>
			<p className='date'>01/02/2022</p>
		</div>
		<div className='delete_button'
			onClick={()=>dispatch(removeTask(title))}
		>
			<img className='delete_icon' srcSet={delete_icon}/>
		</div>
	</div>;
};