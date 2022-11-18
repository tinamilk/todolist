import React, { useMemo, useState } from 'react';
import './Pagination.css';
import next from '../../assets/img/next_icon.svg';
import prev from '../../assets/img/prev_icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../store/page/pageSlice';

export const Pagination = () => {

	const dispatch = useDispatch();
	const currentPage = useSelector((state) => state.page.currentPage);
	const tasks = useSelector((state) => state.filter.filtered);
	const lastPageNumber = Math.ceil(tasks.length / 5);
	const pagesPartsCount = Math.ceil(lastPageNumber / 10);

	const [pagesPart, setPagesPart] = useState(1);

	const firstTemporaryNumber = pagesPart * 10 - 9;
	const lastTemporaryNumber = pagesPartsCount === pagesPart 
		? lastPageNumber : pagesPart * 10; //вынести

	const pages = useMemo(() => {
		const temporary = [];

		for (let firstNumber = firstTemporaryNumber; firstNumber <= lastTemporaryNumber; firstNumber++) {
			temporary.push(firstNumber);
		}
		return temporary;
	}, [lastPageNumber, pagesPart]);

	
	console.log(pages);

	const handleChangePage = (page) => {

		if (page >= 1 && page <= lastPageNumber) {
			dispatch(setPage(page));
		}
	};


	return <div className='page-pagination'>
		{currentPage !== 1 &&
		<img
			srcSet={prev}
			className='prev_button'
			onClick={()=>handleChangePage(currentPage-1)}
		/>}
		{pagesPart !== 1 &&
			<button
				onClick={()=>setPagesPart(pagesPart - 1)}
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
				onClick={()=>setPagesPart(pagesPart + 1)}
				className='part-number'>
				...
			</button>
		}

		{currentPage !== lastPageNumber && 
		<img
			srcSet={next}
			className='next-button'
			onClick={()=>handleChangePage(currentPage+1)}
		/>
		}
	</div>;
};