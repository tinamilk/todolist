import React, { useState } from 'react';
import './SortByDateButtons.css';
import down from '../../assets/img/arrow_down.svg';
import up from '../../assets/img/arrow_up.svg';
import { useDispatch } from 'react-redux';
import { changeSorting } from '../../store/tasksQuery/tasksQuery';


const sortingValues = {
	UP: 'desc',
	DOWN: 'asc'
};

export const SortByDateButtons = () => {

	const [sorting, setSorting] = useState(sortingValues.UP);

	const dispatch = useDispatch();

	const handleSortingChangeNew = () => {
		dispatch(changeSorting(sortingValues.UP));
		setSorting(sortingValues.UP);
	};

	const handleSortingChangeOld = () => {
		dispatch(changeSorting(sortingValues.DOWN));
		setSorting(sortingValues.DOWN);
	};

	const isDisabled = condition => condition === sorting ? '  disabled' : ' active';


	return <div className='date-buttons'>

		<p className={'date-button-title'}>Sort by date</p>
		<button
			className={'up-button' + isDisabled(sortingValues.UP)}
			onClick={handleSortingChangeNew}>

			<img
				alt='up'
				srcSet={up}
			/>

		</button>

		<button
			onClick={handleSortingChangeOld}
			className={'down-button' + isDisabled(sortingValues.DOWN)}
		>
			
			<img
				alt='down'
				srcSet={down}
			/>

		</button>
	</div>;
};