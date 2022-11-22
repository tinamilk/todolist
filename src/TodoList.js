import React, { useEffect, useState } from 'react';
import { Input } from './components/Input/Input';
import { FilterButtons } from './components/FilterButton/FilterButtons';
import { SortByDateButtons } from './components/SortByDateButton/SortByDateButtons';
import { Tasks } from './components/Tasks/Tasks';
import './globalStyles/styles.css';
import { Pagination } from './components/Pagination/Pagination';
import { useSelector } from 'react-redux';
import { useGetTasksQuery } from './store/tasksApi/tasksApi';


function ToDoList() {

	const {sortByDate, pp, page, filter } = useSelector((state) => state.tasksQuery);
	const data = useGetTasksQuery({sortByDate, pp, page, filter});

	const [tasks, setTasks] = useState([]);
	const [tasksLength, setTasksLength] = useState(0);

	useEffect(() => {
		data.currentData ? setTasks(data.currentData.tasks) : null;
		data.currentData ? setTasksLength(data.currentData.count) : null;
	}, [data]);


	console.log(tasks.length);
	return (
		<div className="to-do-list">
			<h1>ToDo List</h1>
			<Input/>
			<div className='buttons'>
				<FilterButtons/>
				<SortByDateButtons/>
			</div>
			<Tasks/>

			{ tasks.length && tasksLength > 5 ? <Pagination/> : null}

		</div>
	);
}

export default ToDoList;
