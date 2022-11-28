import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Task } from '../Task/Task';
import { useGetTasksQuery } from '../../store/tasksApi/tasksApi';
import { Spinner, Box, Heading } from '@chakra-ui/react';
import { changePage } from '../../store/tasksQuery/tasksQuery';

export const Tasks = () => {

	const params = useSelector((state) => state.tasksQuery);
	const currentPage = useSelector((state) => state.tasksQuery.page);
	const [tasks, setTasks] = useState([]);
	const [tasksCount, setTasksCount] = useState();
	const [requestId, setRequestId ] = useState('');

	const [isEditInputDisabled, setIsEditInputDisabled] = useState(false);
	const toggleEditInputDisabled = (condition) => setIsEditInputDisabled(condition);

	const data = useGetTasksQuery(params);
	const dispatch = useDispatch();


	useEffect(() => {

		if (data.currentData ) {
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

	return <Box width='75%' minHeight='50%'>

		{data.isLoading &&
			<Box className='empty_container'>
				<Spinner
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color='#115055'
					size='xl'
				/>
			</Box>
		}

		{
			data.requestId === requestId && params.filter !== '' && tasksCount === 0 &&

			<Box
				display='flex'
				flexDirection='column'
				justifyContent='center'
				alignItems='center'
			>
				<Heading className='empty_message' as='h4' size='md' color='#197278'>
					{getEmptyMessage(params.filter)}
				</Heading>
			</Box>
		}

		{
			!!tasksCount && 
				tasks.map(task=> <Task
					key = {task.uuid}
					id={task.uuid}
					title={task.name}
					isDone={task.done}
					date={task.createdAt}
					toggleEditInputDisabled={toggleEditInputDisabled}
					isEditInputDisabled={isEditInputDisabled}
				/>)
		}
	</Box>;
};
