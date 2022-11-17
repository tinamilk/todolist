import React from 'react';
import './Pagination.css';
import next from '../../assets/img/next_icon.svg';
import prev from '../../assets/img/prev_icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../store/page/pageSlice';

export const Pagination = ({tasks}) => {

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


	return <div className='page-pagination'>
		<img
			srcSet={prev}
			className='prev_button'
			onClick={()=>handleChangePage(currentPage-1)}
		/>

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

		<img
			srcSet={next}
			className='next-button'
			onClick={()=>handleChangePage(currentPage+1)}
		/>
	</div>;
};