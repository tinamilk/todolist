import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import './FilterButtons.css';
import { filters, filterTasks  } from './filterTasks';
import { setPage } from '../../store/page/pageSlice';

export const FilterButtons = ({setFilteresTasks}) => {

	const tasks = useSelector((state) => state.tasks);
	const [filter, setFilter] = useState(filters.ALL);

	const dispatch = useDispatch();

	const isDisabled = (cond) => {
		const filtered = filterTasks(tasks, cond);
		return filtered.length === 0;
	};

	useEffect(() => {
		const filtered = filterTasks(tasks, filter);
		setFilteresTasks(filtered);

		if (isDisabled(filter)) {
			setFilter(filters.ALL);
		}

	}, [filter, tasks]);

	useEffect(() => {
		dispatch(setPage(1));
	}, [filter]);

	const handleFilterChange = (filter) => {
		setFilter(filter);
	};


	return <div className='filter-buttons'>

		{Object.values(filters).map((currentFilter, index) => {

			const isButtonDisabled = isDisabled(currentFilter);

			const disabledClassName = isButtonDisabled ? ' disabled' : '';

			const filterClassName = filter === currentFilter ?
				'current-filter active' :
				'current-filter';

			return <button
				key={index}
				onClick={()=>handleFilterChange(currentFilter)}
				className={filterClassName + disabledClassName}
				disabled={isButtonDisabled}
			>
				{currentFilter}
			</button>;
		})}

	</div>;
};