import React, { useEffect } from 'react';
import { useSelector  } from 'react-redux';
import { Task } from '../Task/Task';
import './Tasks.css';
import { splitTasks } from './splitTasks';

export const Tasks = () => {

	const tasks = useSelector((state) => state.tasks);
	const currentPage = useSelector((state) => state.page.currentPage);
	let sortedTasks = splitTasks(tasks);

	useEffect(() => {
		sortedTasks = splitTasks(tasks);
	},[]);

	console.log(sortedTasks[currentPage]);

	return <div className='tasks'>
		{Object.keys(sortedTasks).length !== 0 ? 
			sortedTasks[currentPage]
				.map((task, index) => <Task key = {index} title={task}/>) 
			: <h3 className='empty-message'>Add some task :)</h3>}
	</div>;
};