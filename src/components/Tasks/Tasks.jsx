import React from 'react';
import { useSelector  } from 'react-redux';
import { Task } from '../Task/Task';
import './Tasks.css';
import { splitTasks } from './splitTasks';

export const Tasks = () => {

	const currentPage = useSelector((state) => state.page.currentPage);
	const unfiltered = useSelector((state) => state.tasks);
	const filter = useSelector((state) => state.filter);
	const sortedTasks = filter.filtered.length ? splitTasks(filter.filtered) : [];

	console.log(filter);

	return <div className='tasks'>
		{sortedTasks.length !== 0 ? 
			sortedTasks[currentPage]
				.map(task=> <Task
					key = {task.id}
					id={task.id}
					title={task.title}
					isDone={task.isDone}
					date={task.date}/>) 
			: unfiltered.length === 0 ?
				<h3 className='empty-message'>Add some task :)</h3> : null}
	</div>;
};