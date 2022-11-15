import React, { useState } from 'react';
import './FilterButtons.css';


const filtersObj = {
	ALL: 'all', 
	DONE: 'done',
	UNDONE: 'undone'
};

export const FilterButtons = () => {

	const [filter, setFilter] = useState(filtersObj.ALL);

	const handleFilterChange = (filter) => {
		setFilter(filter);
	};


	return <div className='filter_buttons'>
		{Object.values(filtersObj).map((currentFilter, index) => {

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