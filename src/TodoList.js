import React from 'react';
import { AddTaskInput } from './components/AddTaskInput/AddTaskInput';
import { FilterButtons } from './components/FilterButton/FilterButtons';
import { SortByDateButtons } from './components/SortByDateButton/SortByDateButtons';
import { Tasks } from './components/Tasks/Tasks';
import './globalStyles/fonts/stylesheet.css';
import { Pagination } from './components/Pagination/Pagination';
import { useSelector } from 'react-redux';
import { useGetTasksQuery } from './store/tasksApi/tasksApi';
import { Modal } from './components/Modal/Modal';
import { Box, Text, useMediaQuery } from '@chakra-ui/react';

function ToDoList() {
	const { sortByDate, pp, page, filter } = useSelector(
		(state) => state.tasksQuery
	);
	const data = useGetTasksQuery({ sortByDate, pp, page, filter });
	const tasksLength = data.currentData ? data.currentData.count : null;
	const [isLargerThan700] = useMediaQuery('(min-width: 700px)');

	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			backgroundColor="#fff"
			width="80vw"
			minHeight="75vh"
			margin="5vh auto"
			padding="5vh 0"
			boxShadow="0px 1px 9px 0px rgba(34, 60, 80, 0.15)"
		>
			<Text as="h1">ToDo List</Text>
			<AddTaskInput />
			<Box
				display="flex"
				justifyContent="space-between"
				width="70%"
				marginTop="10px"
				flexDirection={isLargerThan700 ? 'row' : 'column'}
			>
				<FilterButtons />
				<SortByDateButtons />
			</Box>
			<Tasks />

			{tasksLength > 5 ? <Pagination /> : null}
			<Modal />
		</Box>
	);
}

export default ToDoList;
