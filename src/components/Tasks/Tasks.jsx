import React, { useEffect, useState } from 'react';
import { useSelector  } from 'react-redux';
import { Task } from '../Task/Task';
import './Tasks.css';
import { useGetTasksQuery } from '../../store/tasksApi/tasksApi';
import loading from '../../assets/img/loading.svg';

export const Tasks = () => {

	const {sortByDate, pp, page} = useSelector((state) => state.tasksQuery);
	const [tasks, setTasks] = useState([]);
	const data = useGetTasksQuery({sortByDate, pp, page});

	useEffect(() => {
		data.currentData ? setTasks(data.currentData.tasks) : null;
	}, [data]);

	
	return <div className='tasks'>
		{tasks.length ?
			tasks.map(task=> <Task
				key = {task.uuid}
				id={task.uuid}
				title={task.name}
				isDone={task.done}
				date={task.createdAt}/>) 
			: <img srcSet={loading} alt='loading'/>}
	</div>;
};