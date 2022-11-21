import React, { useEffect, useState, useMemo } from 'react';
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
	const pagesPartsCount = Math.ceil(lastPageNumber / 5);

	const [pagesPart, setPagesPart] = useState(1);

	const firstTemporaryNumber = pagesPart * 5 - 4;
	const lastTemporaryNumber = pagesPartsCount === pagesPart 
		? lastPageNumber : pagesPart * 5;

	useEffect(() => {
		handleChangePage(currentPage);
	}, [currentPage]);

	const pages = useMemo(() => {
		const temporary = [];

		for (let firstNumber = firstTemporaryNumber; firstNumber <= lastTemporaryNumber; firstNumber++) {
			temporary.push(firstNumber);
		}

		return temporary;
	}, [pagesPart, firstTemporaryNumber, lastTemporaryNumber]);


	const handleChangePage = (page) => {

		dispatch(setPage(page));

		if (page < firstTemporaryNumber) {
			setPagesPart(pagesPart - 1);
		} else if (page > lastTemporaryNumber) {
			setPagesPart(pagesPart + 1);
		}
		
	};

	const handleChahgeNextPart = () => {
		setPagesPart(pagesPart + 1);
		dispatch(setPage(firstTemporaryNumber + 5));
	};

	const handleChahgePrevPart = () => {

		setPagesPart(pagesPart - 1);
		dispatch(setPage(pagesPart * 5 - 5)); //*4
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