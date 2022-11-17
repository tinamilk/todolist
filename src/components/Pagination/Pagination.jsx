import React, { useMemo } from 'react';
import './Pagination.css';
import next from '../../assets/img/next_icon.svg';
import prev from '../../assets/img/prev_icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../store/page/pageSlice';

export const Pagination = () => {

	const dispatch = useDispatch();
	const currentPage = useSelector((state) => state.page.currentPage);
	const tasks = useSelector((state) => state.filter.filtered);
	// const lastPageNumber = tasks.length ? Math.ceil(tasks.length / 5) : null;
	const lastPageNumber = Math.ceil(tasks.length / 5);

	const pages = useMemo(() => {
		const temporary = [];
		for (let pageNumber = 1; pageNumber <= lastPageNumber; pageNumber++) {
			temporary.push(pageNumber);
		}
		return temporary;
	}, [lastPageNumber]);

	const handleChangePage = (page) => {

		if (page >= 1 && page <= lastPageNumber) {
			dispatch(setPage(page));
		}
	};


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