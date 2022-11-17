import React, { useState } from 'react';
import { Heading } from './components/Heading/Heading';
import { Input } from './components/Input/Input';
import { FilterButtons } from './components/FilterButton/FilterButtons';
import { SortByDateButtons } from './components/SortByDateButton/SortByDateButtons';
import { Tasks } from './components/Tasks/Tasks';
import './globalStyles/styles.css';
import { PagePagination } from './components/PagePagination/PagePagination';
import { useSelector } from 'react-redux';


function ToDoList() {
	const tasks = useSelector((state) => state.tasks);
	const [filteredTasks, setFilteredTasks] = useState(tasks);

	console.log(tasks);

	const handleFiltered = (filtered) => {
		setFilteredTasks(filtered);
	};

	return (
		<div className="to-do-list">
			<Heading/>
			<Input/>
			<div className='buttons'>
				<FilterButtons setFilter={handleFiltered} />
				<SortByDateButtons/>
			</div>
			<Tasks filtered = {filteredTasks}/>

			{filteredTasks.length ? <PagePagination tasks={filteredTasks}/> : <></>}

		</div>
	);
}

export default ToDoList;
