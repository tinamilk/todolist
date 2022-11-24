import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Task } from '../Task/Task';
import './Tasks.css';
import { useGetTasksQuery } from '../../store/tasksApi/tasksApi';
import { Spinner } from '@chakra-ui/react';

export const Tasks = () => {

	const params = useSelector((state) => state.tasksQuery);
	const [tasks, setTasks] = useState([]);
	const [tasksCount, setTasksCount] = useState();
	const [requestId, setRequestId ] = useState('');

	const [isEditInputDisabled, setIsEditInputDisabled] = useState(false);
	const toggleEditInputDisabled = () => setIsEditInputDisabled(!isEditInputDisabled);

	const data = useGetTasksQuery(params);


	useEffect(() => {

		if (data.currentData ) {
			setTasks(data.currentData.tasks);
			setTasksCount(data.currentData.count);
			setRequestId(data.requestId);
		}

	}, [data, params.filter]);

	const getEmptyMessage = (filter) => {
		return `${filter} is empty :)`;
	};

	return <div className='tasks'>

		{data.isLoading &&
			<div className='empty_container'>
				<Spinner
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color='#115055'
					size='xl'
				/>
			</div>
		}

		{
			data.requestId === requestId && params.filter !== '' && tasksCount === 0 &&

			<div className='empty_container'><h3 className='empty_message'>{getEmptyMessage(params.filter)}</h3></div>
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
	</div>;
};
