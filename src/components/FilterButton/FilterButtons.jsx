/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import './FilterButtons.css';
import { filters, filterTasks } from './filterTasks';
import { setFilter} from '../../store/tasksQuery/tasksQuery';

export const FilterButtons = () => {

	const tasks = useSelector((state) => state.tasks);

	const dispatch = useDispatch();



	const handleFilterChange = (filter) => {

		console.log(filter);
		dispatch(setFilter(filter));

	};


	return <div className='filter-buttons'>

		{Object.values(filters).map((currentFilter, index) => {

			// const isButtonDisabled = setIsDisabled(currentFilter);

			return <button
				key={index}
				onClick={()=>handleFilterChange(currentFilter)}
				className='current-filter'
				// disabled={isButtonDisabled}
			>
				{currentFilter}
			</button>;
		})}

	</div>;
};