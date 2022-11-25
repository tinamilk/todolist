import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './FilterButtons.css';
import { changePage, setFilter} from '../../store/tasksQuery/tasksQuery';
import { Button, Box } from '@chakra-ui/react';

const filters = {
	ALL: '', 
	DONE: 'done',
	UNDONE: 'undone'
};

export const FilterButtons = () => {

	const dispatch = useDispatch();
	const [currentFilter, setCurrentFilter] = useState('');

	const handleFilterChange = (filter) => {

		dispatch(setFilter(filter));
		dispatch(changePage(1));
		setCurrentFilter(filter);
	};

	const setIsActiveClassName = (filter) => {
		return filter === currentFilter;
	};


	return <Box className='filter-buttons'
		display='flex' flexDirection='row' justifyContent='space-between'>

		{Object.values(filters).map((currentFilter, index) => {

			const filterClassName = setIsActiveClassName(currentFilter) ?
				'current-filter active' : 'current-filter';

			return <Button
				key={index}
				onClick={()=>handleFilterChange(currentFilter)}
				className={filterClassName}
			>
				{currentFilter || 'all'}
			</Button>;
		})}

	</Box>;
};