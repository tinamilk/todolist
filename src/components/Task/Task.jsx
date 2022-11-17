import React, { useState } from 'react';
import delete_icon from '../../assets/img/delete_icon.svg';
import checked_icon from '../../assets/img//checked_icon.svg';
import './Task.css';
import { useDispatch } from 'react-redux';
import { removeTask, setIsDone } from '../../store/tasks/tasksSlice';

export const Task = ({title, id, isDone, date}) => {

	const [isMouseEnter, setIsMouseEnter] = useState(false);
	const dispatch = useDispatch();
	const toggleClassName = isDone ? 'checkbox checked' : 'checkbox';
	const fullTitleClassName = isMouseEnter ? ' full' : '';

	const handleChangeIsDone = () => {
		dispatch(setIsDone(id));
	};

	const handleSetFullTitle = () => {
		setIsMouseEnter(true);
	};

	const handleSetCuttedTitle = () => {
		setIsMouseEnter(false);
	};

	const formatedDate = new Date(date);


	return <div className='task' 
		onMouseOver={(() => handleSetFullTitle())}
		onMouseOut={(() => handleSetCuttedTitle())}
	>
		<div
			className={toggleClassName}
			onClick={() => handleChangeIsDone()}
		>
			{isDone && <img className='checked-icon' srcSet={checked_icon}/>}
		</div>
		<div className='task-data'>
			<p className={'title' + fullTitleClassName}>
				{isMouseEnter ? 
					title : title.length > 60 ?
						title.slice(61) + '...' : title
				}</p>
			<p className='date'>{formatedDate.toLocaleString()}</p>
		</div>
		<div className='delete-button'
			onClick={()=>dispatch(removeTask(id))}
		>
			<img className='delete-icon' srcSet={delete_icon}/>
		</div>
	</div>;
};