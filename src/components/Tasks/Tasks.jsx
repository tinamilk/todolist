import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Task } from '../Task/Task';
import { useGetTasksQuery } from '../../store/tasksApi/tasksApi';
import { Spinner, Box, Heading } from '@chakra-ui/react';
import { changePage } from '../../store/tasksQuery/tasksQuery';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export const Tasks = () => {
	const params = useSelector((state) => state.tasksQuery);
	const currentPage = useSelector((state) => state.tasksQuery.page);
	const [tasks, setTasks] = useState([]);
	const [tasksCount, setTasksCount] = useState();
	const [requestId, setRequestId] = useState('');

	const [isEditInputDisabled, setIsEditInputDisabled] = useState(false);
	const toggleEditInputDisabled = (condition) =>
		setIsEditInputDisabled(condition);

	const data = useGetTasksQuery(params);
	const dispatch = useDispatch();

	useEffect(() => {
		if (data.currentData && !data.isFetching) {
			setTasks(data.currentData.tasks);
			setTasksCount(data.currentData.count);
			setRequestId(data.requestId);

			if (data.currentData.tasks.length === 0 && currentPage !== 1) {
				dispatch(changePage(currentPage - 1));
			}
		}
	}, [data, params.filter]);

	const getEmptyMessage = (filter) => {
		return `${filter} is empty :)`;
	};

	return (
		<Box width="75%" minHeight="40vh">
			{data.isLoading && (
				<Box
					display="flex"
					flexDirection="column"
					justifyContent="center"
					minWidth="20vh"
				>
					<Spinner
						thickness="4px"
						speed="0.65s"
						emptyColor="gray.200"
						color="#115055"
						size="xl"
						alignSelf="center"
					/>
				</Box>
			)}

			{data.requestId === requestId &&
				params.filter !== '' &&
				tasksCount === 0 && (
				<Box
					display="flex"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
				>
					<Heading as="h4" size="md" color="#197278">
						{getEmptyMessage(params.filter)}
					</Heading>
				</Box>
			)}

			<TransitionGroup className="todo-list" exit={false} timeout={500}>
				{!!tasks.length &&
					tasks.map((task) => (
						<CSSTransition key={task.id} timeout={500} classNames="item">
							<Task
								key={task.id}
								id={task.id}
								title={task.title}
								done={task.isDone}
								date={task.createdAt}
								toggleEditInputDisabled={toggleEditInputDisabled}
								isEditInputDisabled={isEditInputDisabled}
							/>
						</CSSTransition>
					))}
			</TransitionGroup>
		</Box>
	);
};
