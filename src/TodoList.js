import React from 'react';
import { Heading } from './components/Heading/Heading';
import { Input } from './components/Input/Input';
import { FilterButtons } from './components/FilterButton/FilterButtons';
import { SortByDateButtons } from './components/SortByDateButton/SortByDateButtons';
import { Tasks } from './components/Tasks/Tasks';
import './globalStyles/styles.css';
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
			<Tasks/>
			<PagePagination pages={5}/>
		</div>
	);
}

export default ToDoList;
