import React from 'react';
import { useSelector  } from 'react-redux';
import { Task } from '../Task/Task';
import './Tasks.css';
import { useGetTasksQuery } from '../../store/tasksApi/tasksApi';

export const Tasks = () => {

	const unfiltered = useSelector((state) => state.tasks);
	const {sortByDate, pp, page} = useSelector((state) => state.tasksQuery);
	const tasks = useGetTasksQuery({sortByDate, pp, page});
	
	return <div className='tasks'>
		{tasks ? 
			tasks.currentData.tasks.map(task=> <Task
				key = {task.uuid}
				id={task.uuid}
				title={task.name}
				isDone={task.done}
				date={task.createdAt}/>) 
			: unfiltered.length === 0 ?
				<h3 className='empty-message'>Add some task :)</h3> : null}
	</div>;
};