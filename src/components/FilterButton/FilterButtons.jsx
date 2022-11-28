import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePage, setFilter } from '../../store/tasksQuery/tasksQuery';
import { Button, Box, useMediaQuery } from '@chakra-ui/react';

const filters = {
	ALL: '',
	DONE: 'done',
	UNDONE: 'undone',
};

export const FilterButtons = () => {
	const dispatch = useDispatch();
	const [currentFilter, setCurrentFilter] = useState('');
	const [isLargerThan700] = useMediaQuery('(min-width: 700px)');

	const handleFilterChange = (filter) => {
		dispatch(setFilter(filter));
		dispatch(changePage(1));
		setCurrentFilter(filter);
	};

	return (
		<Box
			display="flex"
			flexDirection="row"
			justifyContent="space-between"
			width={isLargerThan700 ? '60%' : '100%'}
		>
			{Object.values(filters).map((filter, index) => {
				return (
					<Button
						key={index}
						onClick={() => handleFilterChange(filter)}
						backgroundColor={filter === currentFilter ? '#F3E8E2' : 'inherit'}
						color="#283D3B"
						width="30%"
						border="2px solid #D36A5F"
						borderRadius="5px"
						cursor="pointer"
						_hover={{
							opacity: '0.8',
							backgroundColor: 'inherit',
						}}
					>
						{filter || 'all'}
					</Button>
				);
			})}
		</Box>
	);
};
