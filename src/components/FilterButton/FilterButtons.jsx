/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './FilterButtons.css';
import { filters, filterTasks } from './filterTasks';
import { changePage, setFilter} from '../../store/tasksQuery/tasksQuery';
import { useGetTasksQuery } from '../../store/tasksApi/tasksApi';

export const FilterButtons = () => {

	const {sortByDate, pp, page, filter } = useSelector((state) => state.tasksQuery);
	const tasksData = useGetTasksQuery({sortByDate, pp, page, filter});
	const [isEmpty, setIsEmpty] = useState(false);
	const dispatch = useDispatch();
	

	const handleFilterChange = (filter) => {

		dispatch(setFilter(filter));
		dispatch(changePage(1));
		setIsEmpty(false);

	};

	useEffect(() => {
		if ( tasksData.currentData && tasksData.currentData.count === 0 ) {
			setIsEmpty(true);
		}
	}, [tasksData]);


	return <div className='filter-buttons'>

		{Object.values(filters).map((currentFilter, index) => {

			return <button
				key={index}
				onClick={()=>handleFilterChange(currentFilter)}
				className='current-filter'
			>
				{currentFilter || 'all'}
			</button>;
		})}

	</div>;
};