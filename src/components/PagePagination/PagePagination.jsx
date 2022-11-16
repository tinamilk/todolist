/* eslint-disable no-undef */
import React from 'react';
import './PagePagination.css';
import next from './img/next_icon.svg';
import prev from './img/prev_icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../store/pageSlice';

export const PagePagination = ({tasks}) => {

	const dispatch = useDispatch();
	const currentPage = useSelector((state) => state.page.currentPage);
	const lastPageNumber = Math.ceil(tasks.length / 5);
	const pages = [];

	const handleChangePage = (page) => {

		if (page >= 1 && page <= lastPageNumber) {
			dispatch(setPage(page));
		}
	};

	for (let pageNumber = 1; pageNumber <= lastPageNumber; pageNumber++) {
		pages.push(pageNumber);
	}


	return <div className='page_pagination'>
		<img
			srcSet={prev}
			className='prev_button'
			onClick={()=>handleChangePage(currentPage-1)}
		/>

		{pages.length ? pages.map(page => {
			return <button
				className='page-number'
				key={page}
				onClick={()=>handleChangePage(page)}
			>
				{page}
			</button>;
		}) : 0}

		<img
			srcSet={next}
			className='next_button'
			onClick={()=>handleChangePage(currentPage+1)}
		/>
	</div>;
};