import React from 'react';
import './SortByDateButtons.css';
import down from '../../assets/img/arrow_down.svg';
import up from '../../assets/img/arrow_up.svg';
import { useDispatch } from 'react-redux';
import { changeSorting } from '../../store/tasksQuery/tasksQuery';


const sortingValues = {
	UP: 'asc',
	DOWN: 'desc'
};

export const SortByDateButtons = () => {

	const dispatch = useDispatch();

	const handleSortingChangeNew = () => {
		dispatch(changeSorting(sortingValues.UP));
	};

	const handleSortingChangeOld = () => {
		dispatch(changeSorting(sortingValues.DOWN));
	};


	return <div className='date-buttons'>

		<p className='date-button-title'>Sort by date</p>
		<button
			onClick={handleSortingChangeNew}>

			<img
				alt='up'
				srcSet={up}
			/>

		</button>

		<button
			onClick={handleSortingChangeOld}>
			
			<img
				alt='down'
				srcSet={down}
			/>

		</button>
	</div>;
};