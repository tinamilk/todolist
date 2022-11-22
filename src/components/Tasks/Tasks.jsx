import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Task } from '../Task/Task';
import './Tasks.css';
import { useGetTasksQuery } from '../../store/tasksApi/tasksApi';
import loading from '../../assets/img/loading.svg';

export const Tasks = () => {

	const {sortByDate, pp, page, filter } = useSelector((state) => state.tasksQuery);
	const [tasks, setTasks] = useState([]);
	const [tasksCount, setTasksCount] = useState();
	const [requestId, setRequestId ] = useState('');

	const data = useGetTasksQuery({sortByDate, pp, page, filter});

	useEffect(() => {
		data.currentData ? setTasks(data.currentData.tasks) : null;
		data.currentData ? setTasksCount(data.currentData.count) : null;
		data.currentData ? setRequestId(data.requestId) : null;
	}, [data, filter]);

	const getEmptyMessage = (filter) => {
		return `${filter} is empty :)`;
	};


	return <div className='tasks'>

		{data.isLoading && <img srcSet={loading} alt='loading'/>}

		{ data.requestId === requestId && filter !== '' && tasksCount === 0 &&
			<h3 className='empty_message'>{getEmptyMessage(filter)}</h3> }

		{
			!!tasksCount && 
				tasks.map(task=> <Task
					key = {task.uuid}
					id={task.uuid}
					title={task.name}
					isDone={task.done}
					date={task.createdAt}/>)
		}
	</div>;
};