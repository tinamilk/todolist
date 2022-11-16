import React from 'react';
import { useSelector  } from 'react-redux';
import { Task } from '../Task/Task';
import './Tasks.css';
import { splitTasks } from './splitTasks';


export const Tasks = () => {

	const tasks = useSelector((state) => state.tasks);
	const currentPage = useSelector((state) => state.page.currentPage);
	const sortedTasks = splitTasks(tasks);

	return <div className='tasks'>
		{sortedTasks.length ? 
			sortedTasks[currentPage -1 ] && sortedTasks[currentPage - 1]
				.map((task, index) => <Task key = {index} title={task}/>) 
			: <h3 className='empty-message'>Add some task :)</h3>}
	</div>;
};