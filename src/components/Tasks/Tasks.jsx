import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Task } from '../Task/Task';
import { useGetTasksQuery } from '../../store/tasksApi/tasksApi';
import { Spinner, Box, Heading, Text } from '@chakra-ui/react';
import {
	changePage,
	changeSorting,
	setFilter,
} from '../../store/tasksQuery/tasksQuery';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { logout } from '../../store/authSlice/authSlice';

export const Tasks = () => {
	const params = useSelector((state) => state.tasksQuery);
	const currentPage = useSelector((state) => state.tasksQuery.page);
	const userName = useSelector((state) => state.auth.userName);
	const [tasks, setTasks] = useState([]);
	const [tasksCount, setTasksCount] = useState();
	const [requestId, setRequestId] = useState('');

	const [isEditInputDisabled, setIsEditInputDisabled] = useState(false);
	const toggleEditInputDisabled = (condition) =>
		setIsEditInputDisabled(condition);

	const data = useGetTasksQuery(params);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem('token');
		dispatch(changeSorting('asc'));
		dispatch(changePage(1));
		dispatch(setFilter(''));
		dispatch(logout());
		navigate('/auth');
	};

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			navigate('/auth');
		}
		data.refetch();
	}, []);

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
		return filter ? `${filter} is empty :)` : 'Add some task';
	};

	return (
		<>
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

				{data.requestId === requestId && tasksCount === 0 && (
					<Box
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignItems="center"
						minHeight="30vh"
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
			<Button onClick={handleLogout} width="20%">
				Logout
			</Button>
			<Text fontSize="xl" margin="0">
				{userName}
			</Text>
		</>
	);
};
