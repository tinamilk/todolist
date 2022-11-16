import React, { useState, useEffect } from 'react';
import { useSelector  } from 'react-redux';
import './FilterButtons.css';
import { filters, filterTasks  } from './filterTasks';

export const FilterButtons = ({setFilter}) => {
	const tasks = useSelector((state) => state.tasks);
	const [filter, setFilterr] = useState(filters.ALL);

	useEffect(()=> {
		const filtered = filterTasks(tasks, filter);
		console.log(filtered);
		setFilter(filtered);
	}, [filter, tasks]);

	function handleFilterChange(filter) {
		setFilterr(filter);
	}


	return <div className='filter_buttons'>
		{Object.values(filters).map((currentFilter, index) => {

			const filterClassName = filter === currentFilter ?
				'current_filter active' :
				'current_filter';

			return <button
				key={index}
				onClick={()=>handleFilterChange(currentFilter)}
				className={filterClassName}
			>
				{currentFilter}
			</button>;
		})}
	</div>;
};