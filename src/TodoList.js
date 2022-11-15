import React from 'react';
import { Heading } from './components/Heading/Heading';
import { Input } from './components/Input/Input';
import { FilterButton } from './components/FilterButton/FilterButton';
import { DateButton } from './components/DateButton/DateButton';
import { Task } from './components/Task/Task';
import './globalStyles/styles.css';
import { tasks } from './tasks';

function ToDoList() {
	return (
		<div className="to_do_list">
			<Heading/>
			<Input/>
			<FilterButton/>
			<DateButton/>
			{tasks.map((task, index) => <Task key={index} title={task}/>)}
		</div>
	);
}

export default ToDoList;
