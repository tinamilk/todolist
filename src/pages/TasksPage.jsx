/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, useMediaQuery } from '@chakra-ui/react';
import { FilterButtons } from '../components/FilterButton/FilterButtons';
import { SortByDateButtons } from '../components/SortByDateButton/SortByDateButtons';
import { AddTaskInput } from '../components/AddTaskInput/AddTaskInput';
import { Pagination } from '../components/Pagination/Pagination';
import { useSelector } from 'react-redux';
import { useGetTasksQuery } from '../store/tasksApi/tasksApi';
import { Tasks } from '../components/Tasks/Tasks';

export const TasksPage = () => {
	const { sortByDate, pp, page, filter } = useSelector(
		(state) => state.tasksQuery
	);

	const [isLargerThan700] = useMediaQuery('(min-width: 700px)');
	const data = useGetTasksQuery({ sortByDate, pp, page, filter });
	const tasksLength = data.currentData ? data.currentData.count : null;

	return (
		<>
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
		</>
	);
};
