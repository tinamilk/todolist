import React from 'react';
import { AddTaskInput } from './components/AddTaskInput/AddTaskInput';
import { FilterButtons } from './components/FilterButton/FilterButtons';
import { SortByDateButtons } from './components/SortByDateButton/SortByDateButtons';
import { Tasks } from './components/Tasks/Tasks';
import './globalStyles/styles.css';
import { Pagination } from './components/Pagination/Pagination';
import { useSelector } from 'react-redux';
import { useGetTasksQuery } from './store/tasksApi/tasksApi';
import { Modal } from './components/Modal/Modal';


function ToDoList() {

	const {sortByDate, pp, page, filter } = useSelector((state) => state.tasksQuery);
	const data = useGetTasksQuery({sortByDate, pp, page, filter});
	const tasksLength = data.currentData ? data.currentData.count : null;


	return (
		<div className="to-do-list">
			<h1>ToDo List</h1>
			<AddTaskInput/>
			<div className='buttons'>
				<FilterButtons/>
				<SortByDateButtons/>
			</div>
			<Tasks/>

			{ tasksLength > 5 ? <Pagination/> : null}
			<Modal/>

		</div>
	);
}

export default ToDoList;
