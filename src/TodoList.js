import React from 'react';
import { Heading } from './components/Heading/Heading';
import { Input } from './components/Input/Input';
import { FilterButton } from './components/FilterButton/FilterButton';
import { DateButton } from './components/DateButton/DateButton';
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
				<FilterButton/>
				<DateButton/>
			</div>
			{tasks.map((task, index) => <Task key={index} title={task}/>)}
			<PagePagination pages={5}/>
		</div>
	);
}

export default ToDoList;
