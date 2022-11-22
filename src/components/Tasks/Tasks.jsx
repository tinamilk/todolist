import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Task } from '../Task/Task';
import './Tasks.css';
import { useGetTasksQuery } from '../../store/tasksApi/tasksApi';
import loading from '../../assets/img/loading.svg';

export const Tasks = () => {

	const {sortByDate, pp, page, filter } = useSelector((state) => state.tasksQuery);
	const [tasks, setTasks] = useState([]);
	const [tasksCount, setTasksCount] = useState(0);

	console.log(filter);

	const data = useGetTasksQuery({sortByDate, pp, page, filter});

	useEffect(() => {
		data.currentData ? setTasks(data.currentData.tasks) : null;
		data.currentData ? setTasksCount(data.currentData.count) : null;
		
		console.log(data);
	}, [data]);


	return <div className='tasks'>
		{tasksCount ?
			tasks.map(task=> <Task
				key = {task.uuid}
				id={task.uuid}
				title={task.name}
				isDone={task.done}
				date={task.createdAt}/>)  :
			<img srcSet={loading} alt='loading'/>} 
	</div>;
};