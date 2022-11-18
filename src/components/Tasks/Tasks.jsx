import React, { useEffect} from 'react';
import { useSelector  } from 'react-redux';
import { Task } from '../Task/Task';
import './Tasks.css';
import { splitTasks } from './splitTasks';

export const Tasks = () => {

	const currentPage = useSelector((state) => state.page.currentPage);
	const unfiltered = useSelector((state) => state.tasks);
	const filter = useSelector((state) => state.filter.filtered);
	let sortedTasks = filter.length ? splitTasks(filter) : [];

	console.log(filter);

	useEffect(() => {
		sortedTasks = filter.length ? splitTasks(filter) : [];

	}, [unfiltered]);
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