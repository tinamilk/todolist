import React from 'react';
import { Heading } from './components/Heading/Heading';
import { Input } from './components/Input/Input';
import { FilterButtons } from './components/FilterButton/FilterButtons';
import { SortByDateButtons } from './components/SortByDateButton/SortByDateButtons';
import { Task } from './components/Task/Task';
import './globalStyles/styles.css';
import { tasks } from './tasks';
import { PagePagination } from './components/PagePagination/PagePagination';

function ToDoList() {
	return (
		<div className="to_do_list">
			<Heading/>
			<Input/>
			<div className='filter_buttons'>
				<FilterButtons/>
				<SortByDateButtons/>
			</div>
			{tasks.map((task, index) => <Task key={index} title={task}/>)}
			<PagePagination pages={5}/>
		</div>
	);
}

export default ToDoList;
