import React from 'react';
import { Input } from './components/Input/Input';
import { FilterButtons } from './components/FilterButton/FilterButtons';
import { SortByDateButtons } from './components/SortByDateButton/SortByDateButtons';
import { Tasks } from './components/Tasks/Tasks';
import './globalStyles/styles.css';
import { Pagination } from './components/Pagination/Pagination';
import { useSelector } from 'react-redux';
import { useGetTasksQuery } from './store/tasksApi/tasksApi';


function ToDoList() {
	const tasks = useSelector((state) => state.tasks);
	const data = useGetTasksQuery({asc:'asc', pp:'5', page:'1'});
	console.log(data.currentData);

	return (
		<div className="to-do-list">
			<h1>ToDo List</h1>
			<Input/>
			<div className='buttons'>
				<FilterButtons/>
				<SortByDateButtons/>
			</div>
			<Tasks/>

			{tasks.length > 5 ? <Pagination/> : null}

		</div>
	);
}

export default ToDoList;
