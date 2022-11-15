import React from 'react';
import { useSelector  } from 'react-redux';
import { Task } from '../Task/Task';
import './Tasks.css';


export const Tasks = () => {

	const tasks = useSelector((state) => state.tasks);

	return <div className='tasks'>
		{tasks.length ?
			tasks.map((task, index) => <Task key = {index} title={task}/>) :
			<h3 className='empty-message'>Add some task :)</h3>
		}
	</div>;
};