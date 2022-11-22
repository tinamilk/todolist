import React, { useEffect, useState } from 'react';
import { Input } from './components/Input/Input';
import { FilterButtons } from './components/FilterButton/FilterButtons';
import { SortByDateButtons } from './components/SortByDateButton/SortByDateButtons';
import { Tasks } from './components/Tasks/Tasks';
import './globalStyles/styles.css';
import { Pagination } from './components/Pagination/Pagination';
import { useSelector } from 'react-redux';
import { useGetTasksQuery } from './store/tasksApi/tasksApi';
import { Modal } from './components/Modal/Modal';
import { useDispatch } from 'react-redux';
import { setInitial } from './store/modal/modal';


function ToDoList() {

	const {sortByDate, pp, page, filter } = useSelector((state) => state.tasksQuery);
	const data = useGetTasksQuery({sortByDate, pp, page, filter});
	const isModalActive = useSelector((state) => state.modal.isActive);
	const modalTitle = useSelector((state) => state.modal.title);

	const dispatch = useDispatch();

	useEffect(() => {
		setTimeout(() => {
			dispatch(setInitial());
		}, 30000);
	}, [isModalActive]);


	const [tasksLength, setTasksLength] = useState(0);

	useEffect(() => {
		data.currentData ? setTasksLength(data.currentData.count) : null;
	}, [data]);

	return (
		<div className="to-do-list">
			<h1>ToDo List</h1>
			<Input/>
			<div className='buttons'>
				<FilterButtons/>
				<SortByDateButtons/>
			</div>
			<Tasks/>

			{ tasksLength > 5 ? <Pagination/> : null}
			{isModalActive && <Modal title={modalTitle}/>}

		</div>
	);
}

export default ToDoList;
