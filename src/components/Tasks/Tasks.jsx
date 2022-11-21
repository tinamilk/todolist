import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Task } from '../Task/Task';
import './Tasks.css';
import { useGetTasksQuery } from '../../store/tasksApi/tasksApi';
import loading from '../../assets/img/loading.svg';

export const Tasks = () => {

	const {sortByDate, pp, page} = useSelector((state) => state.tasksQuery);
	const [tasks, setTasks] = useState([]);


	const getTasks = async () => {

		try {
			const data = useGetTasksQuery({ sortByDate, pp, page });
			if (await data.currentData) {
				setTasks(data.currentData.tasks);
				console.log(tasks);
			}
		} catch (err) {
			console.log(err.message);
		}

	};

	getTasks();

	
	return <div className='tasks'>
		{tasks && tasks.length ?
			tasks.map(task=> <Task
				key = {task.uuid}
				id={task.uuid}
				title={task.name}
				isDone={task.done}
				date={task.createdAt}/>) 
			: <img srcSet={loading} alt='loading'/>}
	</div>;
};