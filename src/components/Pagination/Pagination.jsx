/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useEffect } from 'react';
import './Pagination.css';
import next from '../../assets/img/next_icon.svg';
import prev from '../../assets/img/prev_icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../../store/tasksQuery/tasksQuery';
import { useGetTasksQuery } from '../../store/tasksApi/tasksApi';


export const Pagination = () => {

	const dispatch = useDispatch();
	const currentPage = useSelector((state) => state.tasksQuery.page);
	const {sortByDate, pp, page, filter } = useSelector((state) => state.tasksQuery);
	const tasksData = useGetTasksQuery({sortByDate, pp, page, filter});

	const [tasksLength, setTasksLength] = useState(0);
	const [currentPageItems, setCurrentPageItems] = useState([]);
	const [pagesPart, setPagesPart] = useState(1);

	useEffect(() => {
		if ( tasksData.currentData ) {
			console.log('kek');
			setTasksLength(tasksData.currentData.count);
			tasksData.currentData.tasks.length === 0 ? handleChangePage(currentPage - 1) : null;
			setCurrentPageItems(tasksData.currentData.tasks);
		}
	}, [tasksData]);

	const lastPageNumber = Math.ceil(tasksLength / 5);
	const pagesPartsCount = Math.ceil(lastPageNumber / 5);

	const firstTemporaryNumber = pagesPart * 5 - 4;
	const lastTemporaryNumber = pagesPartsCount === pagesPart 
		? lastPageNumber : pagesPart * 5;

	const pages = useMemo(() => {
		const temporary = [];

		for (let firstNumber = firstTemporaryNumber; firstNumber <= lastTemporaryNumber; firstNumber++) {
			temporary.push(firstNumber);
		}
		return temporary;
	}, [lastPageNumber, pagesPart]);

	

	const handleChangePage = (page) => {

		dispatch(changePage(page));

		if (page < firstTemporaryNumber) {
			setPagesPart(pagesPart - 1);
			console.log('first ' + firstTemporaryNumber);
		} else if (page > lastTemporaryNumber) {
			console.log('last' + lastTemporaryNumber);
			setPagesPart(pagesPart + 1);
		}
		
	};

	const handleChahgeNextPart = () => {
		setPagesPart(pagesPart + 1);
		dispatch(changePage(firstTemporaryNumber + 5));
	};

	const handleChahgePrevPart = () => {

		setPagesPart(pagesPart - 1);
		dispatch(changePage(pagesPart * 5 - 5));
	};

	return <div className='page-pagination'>
		{currentPage !== 1 &&
		<img
			alt='prev'
			srcSet={prev}
			className='prev_button'
			onClick={()=>handleChangePage(1)}
		/>}
		{pagesPart !== 1 &&
			<button
				onClick={()=>handleChahgePrevPart()}
				className='part-number'>
					...
			</button>
		}

		{pages.length ? pages.map(page => {

			const pageClassName = page === currentPage ?
				'page-number active' : 'page-number';
			return <button
				className={pageClassName}
				key={page}
				onClick={()=>handleChangePage(page)}
			>
				{page}
			</button>;
		}) : 0}

		{pagesPart !== pagesPartsCount &&
			<button
				onClick={()=>handleChahgeNextPart()}
				className='part-number'>
				...
			</button>
		}

		{currentPage !== lastPageNumber &&
		<img
			alt='prev'
			srcSet={next}
			className='next-button'
			onClick={()=>handleChangePage(lastPageNumber)}
		/>
		}
	</div>;
};