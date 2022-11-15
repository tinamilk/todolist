import React, { useState } from 'react';
import './FilterButton.css';

const filters = ['all', 'done', 'undone'];

export const FilterButton = () => {

	const [filter, setFilter] = useState('all');

	return <div className='filter_button'>
		{filters.map((currentFilter, index) => {

			const filterClassName = filter === currentFilter ?
				'current_filter active' :
				'current_filter';

			return <div
				key={index}
				onClick={()=>setFilter(currentFilter)}
				className={filterClassName}
			>{currentFilter}</div>;
		})}
	</div>;
};