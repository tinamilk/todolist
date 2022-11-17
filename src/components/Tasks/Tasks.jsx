import React from 'react';
import { useSelector  } from 'react-redux';
import { Task } from '../Task/Task';
import './Tasks.css';
import { splitTasks } from './splitTasks';

export const Tasks = ({filtered, unfiltered}) => {

	const currentPage = useSelector((state) => state.page.currentPage);
	const sortedTasks = filtered.length ? splitTasks(filtered) : [];

	return <div className='tasks'>
		{Object.keys(sortedTasks).length !== 0 ? 
			sortedTasks[currentPage]
				.map(task=> <Task
					key = {task.id}
					id={task.id}
					title={task.title}
					isDone={task.isDone}
					date={task.date}/>) 
			: unfiltered.length === 0 ?
				<h3 className='empty-message'>Add some task :)</h3> : <></>}
	</div>;
};