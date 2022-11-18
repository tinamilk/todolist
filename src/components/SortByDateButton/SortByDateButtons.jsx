import React, { useState } from 'react';
import './SortByDateButtons.css';
import down from '../../assets/img/arrow_down.svg';
import up from '../../assets/img/arrow_up.svg';
import { useDispatch, useSelector } from 'react-redux';
import { sortTasksByDateNew, sortTasksByDateOld  } from '../../store/tasks/tasksSlice';


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

	const setIsActiveClassName = (condition) =>
		tasks.length <= 1 ? ' disabled' : condition === sorting ? ' disabled' : '';

	return <div className='date-buttons'>

		<p className='date-button-title'>Sort by date</p>
		<button
			onClick={handleSortingChangeNew}>

			<img
				alt='up'
				className={'up-icon' + setIsActiveClassName(sortingValues.UP)}
				srcSet={up}
			/>

		</button>

		<button
			onClick={handleSortingChangeOld}>
			
			<img
				alt='down'
				className={'down-icon' + setIsActiveClassName(sortingValues.DOWN)}
				srcSet={down}
			/>

		</button>
	</div>;
};