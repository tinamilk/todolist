import React from 'react';
import { useSelector  } from 'react-redux';
import { Task } from '../Task/Task';
import './Tasks.css';
import { splitTasks } from './splitTasks';

export const Tasks = () => {

	const tasks = useSelector((state) => state.tasks);
	const currentPage = useSelector((state) => state.page.currentPage);
	const sortedTasks = tasks.length ? splitTasks(tasks) : [];

	console.log(tasks);
	console.log(sortedTasks[currentPage]);

	return <div className='tasks'>
		{Object.keys(sortedTasks).length !== 0 ? 
			sortedTasks[currentPage]
				.map(task=> <Task key = {task.id} id={task.id} title={task.title} isDone={task.isDone}/>) 
			: <h3 className='empty-message'>Add some task :)</h3>}
	</div>;
};