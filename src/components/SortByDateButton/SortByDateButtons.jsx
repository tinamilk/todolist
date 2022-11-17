import React, { useState } from 'react';
import './SortByDateButtons.css';
import down from '../../assets/img/arrow_down.svg';
import up from '../../assets/img/arrow_up.svg';
import { useDispatch, useSelector } from 'react-redux';
import { sortTasksByDateNew, sortTasksByDateOld  } from '../../store/tasks/tasksSlice';


export const SortByDateButtons = () => {

	const dispatch = useDispatch();
	const [sorting, setSorting] = useState('up');
	const tasks = useSelector((state) => state.tasks);

	const handleSortingChangeNew = () => {
		dispatch(sortTasksByDateNew());
		setSorting('up');
	};

	const handleSortingChangeOld = () => {
		dispatch(sortTasksByDateOld());
		setSorting('down');
	};

	const isActiveClassName = (cond) => {

		return tasks.length <= 1 ? ' disabled' : cond === sorting ? ' disabled' : '';
	};

	return <div className='date-buttons'>
		<p className='date-button-title'>Sort by date</p>
		<button
			className={'up-button' + isActiveClassName('up')}
			onClick={()=>handleSortingChangeNew()}>

			<img className={'up-icon' + isActiveClassName('up')} srcSet={up}/>

		</button>

		<button
			className={'down-button' + isActiveClassName('down')}
			onClick={()=>handleSortingChangeOld()}>
			
			<img className={'down-icon' + isActiveClassName('down')} srcSet={down}/>

		</button>
	</div>;
};