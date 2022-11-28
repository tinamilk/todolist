import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeSorting } from '../../store/tasksQuery/tasksQuery';
import { IconButton, Box, Button } from '@chakra-ui/react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';


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


	return <Box display='flex' flexDirection='row'>

		<Button margin='auto 5px' color='#283D3B' fontSize='xl'
			cursor='pointer' variant='ghost'
			onClick={sorting === sortingValues.UP ? handleSortingChangeOld : handleSortingChangeNew}>
				Sort by date
		</Button>

		<IconButton
			variant='ghost'
			onClick={sorting === sortingValues.UP ? handleSortingChangeOld : handleSortingChangeNew}
			icon={sorting === sortingValues.UP ? <AiOutlineArrowDown/> : <AiOutlineArrowUp/>}>

		</IconButton>
	</Box>;
};