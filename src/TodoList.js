import React from 'react';
import { Heading } from './components/Heading/Heading';
import { Input } from './components/Input/Input';
import { FilterButtons } from './components/FilterButton/FilterButtons';
import { SortByDateButtons } from './components/SortByDateButton/SortByDateButtons';
import { Tasks } from './components/Tasks/Tasks';
import './globalStyles/styles.css';
import { Pagination } from './components/Pagination/Pagination';
import { useSelector } from 'react-redux';


function ToDoList() {
	const tasks = useSelector((state) => state.tasks);

	return (
		<div className="to-do-list">
			<Heading/>
			<Input/>
			<div className='buttons'>
				<FilterButtons/>
				<SortByDateButtons/>
			</div>
			<Tasks/>

			{tasks[0] ? <Pagination/> : null}

		</div>
	);
}

export default ToDoList;
