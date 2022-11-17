import React, { useState } from 'react';
import './SortByDateButtons.css';
import down from '../../assets/img/arrow_down.svg';
import up from '../../assets/img/arrow_up.svg';
import { useDispatch, useSelector } from 'react-redux';
import { sortTasksByDateNew, sortTasksByDateOld  } from '../../store/tasks/tasksSlice';

// eslint-disable-next-line no-unused-vars
const sortingValues = {
	UP: 'up',
	DOWN: 'down'
};

export const SortByDateButtons = () => {

	const dispatch = useDispatch();
	const [sorting, setSorting] = useState(sortingValues.UP);
	const tasks = useSelector((state) => state.tasks);

	const handleSortingChangeNew = () => {
		dispatch(sortTasksByDateNew());
		setSorting(sortingValues.UP);
	};

	const handleSortingChangeOld = () => {
		dispatch(sortTasksByDateOld());
		setSorting(sortingValues.DOWN);
	};

	const isActiveClassName = (cond) => { // usememo

		return tasks.length <= 1 ? ' disabled' : cond === sorting ? ' disabled' : '';
	};

	return <div className='date-buttons'>
		<p className='date-button-title'>Sort by date</p>
		<button
			className={'up-button' + isActiveClassName(sortingValues.UP)}
			onClick={handleSortingChangeNew}>

			<img className={'up-icon' + isActiveClassName(sortingValues.UP)} srcSet={up}/>

		</button>

		<button
			className={'down-button' + isActiveClassName(sorting.DOWN)}
			onClick={handleSortingChangeOld}>
			
			<img className={'down-icon' + isActiveClassName(sorting.DOWN)} srcSet={down}/>

		</button>
	</div>;
};