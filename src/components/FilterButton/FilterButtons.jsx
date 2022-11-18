import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import './FilterButtons.css';
import { filters, filterTasks } from './filterTasks';
import { setPage } from '../../store/page/pageSlice';
import { setAll, setDone, setUndone} from '../../store/filter/filterSlice';

export const FilterButtons = () => {

	const tasks = useSelector((state) => state.tasks);
	const filter = useSelector((state) => state.filter.currentFilter);

	const dispatch = useDispatch();

	const setIsDisabled = (condition) => {
		const isNotEmpty = filterTasks(tasks, condition);
		return !isNotEmpty || !tasks.length;
	};

	useEffect(() => {
		dispatch(setAll(tasks));
	}, []);

	useEffect(() => {
		dispatch(setPage(1));
	}, [filter]);

	const handleFilterChange = (filter) => {

		switch(filter) {
		case filters.UNDONE:
			dispatch(setUndone(tasks));
			break;
		case filters.DONE:
			dispatch(setDone(tasks));
			break;
		case filters.ALL:
			dispatch(setAll(tasks));
			break;
		}

		console.log(filter);
	};

	useEffect(() => {

		handleFilterChange(filter);

		if (setIsDisabled(filter)) {
			handleFilterChange(filters.ALL);
		}


	}, [ tasks, filter]);


	return <div className='filter-buttons'>

		{Object.values(filters).map((currentFilter, index) => {

			const isButtonDisabled = setIsDisabled(currentFilter);

			const disabledClassName = isButtonDisabled ? ' disabled' : '';

			const filterClassName = filter === currentFilter ?
				'current-filter active' :
				'current-filter';

			return <button
				key={index}
				onClick={()=>handleFilterChange(currentFilter)}
				className={filterClassName + disabledClassName}
				disabled={isButtonDisabled}
			>
				{currentFilter}
			</button>;
		})}

	</div>;
};