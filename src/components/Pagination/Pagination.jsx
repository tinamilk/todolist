import React, { useMemo, useState, useEffect } from 'react';
import next from '../../assets/img/next_icon.svg';
import prev from '../../assets/img/prev_icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../../store/tasksQuery/tasksQuery';
import { useGetTasksQuery } from '../../store/tasksApi/tasksApi';
import { Button, Box } from '@chakra-ui/react';


export const Pagination = () => {

	const dispatch = useDispatch();
	const currentPage = useSelector((state) => state.tasksQuery.page);
	const {sortByDate, pp, page, filter } = useSelector((state) => state.tasksQuery);
	const tasksData = useGetTasksQuery({sortByDate, pp, page, filter});

	const [tasksLength, setTasksLength] = useState(0);
	const [pagesPart, setPagesPart] = useState(1);

	const lastPageNumber = Math.ceil(tasksLength / 5);
	const pagesPartsCount = Math.ceil(lastPageNumber / 5);
	const firstTemporaryNumber = pagesPart * 5 - 4;
	const lastTemporaryNumber = pagesPartsCount === pagesPart 
		? lastPageNumber : pagesPart * 5;


	const handleChangePage = (page) => {
		console.log(page + ' page');
		dispatch(changePage(page));
			
	};

	const changePart = () => {
		if (currentPage === lastPageNumber) {
			setPagesPart(pagesPartsCount);
		} else if (currentPage <= 5) {
			setPagesPart(1);
		} else if (currentPage < firstTemporaryNumber) {
			setPagesPart(pagesPart - 1);
		} else if (currentPage > lastTemporaryNumber) {
			setPagesPart(pagesPart + 1);
		}
	};

	const pages = useMemo(() => {
		changePart();
		const temporary = [];
		for (let firstNumber = firstTemporaryNumber; firstNumber <= lastTemporaryNumber; firstNumber++) {
			temporary.push(firstNumber);
		}
		return temporary;
	}, [lastPageNumber, pagesPart, currentPage]);

	useEffect(() => {
		if ( tasksData.currentData ) {
			setTasksLength(tasksData.currentData.count);

			if (tasksData.currentData.tasks.length === 0 && currentPage !== 1) {
				handleChangePage(currentPage - 1);
			}
		}
	}, [tasksData]);

	const handleChahgeNextPart = () => {
		setPagesPart(pagesPart + 1);
		dispatch(changePage(firstTemporaryNumber + 5));
	};

	const handleChahgePrevPart = () => {

		setPagesPart(pagesPart - 1);
		dispatch(changePage(pagesPart * 5 - 5));
	};

	return <Box
		display='flex'
		flexDirection='row'
		justifyContent='space-around'
		marginTop='5vh'
	>
		{currentPage !== 1 &&
		<Button onClick={()=>handleChangePage(1)} variant='ghost'>
			<img
				alt='prev'
				srcSet={prev}
			/>
		</Button>}
		{pagesPart !== 1 &&
			<Button
				variant='ghost'
				onClick={()=>handleChahgePrevPart()}
			>
					...
			</Button>
		}

		{pages.length ? pages.map(page => {
			return <Button
				color={page === currentPage ? '#1B8188' : '#283D3B'}
				variant='ghost'
				key={page}
				onClick={()=>handleChangePage(page)}
			>
				{page}
			</Button>;
		}) : 0}

		{pagesPart !== pagesPartsCount &&
			<Button variant='ghost'
				onClick={()=>handleChahgeNextPart()}
			>
				...
			</Button>
		}

		{currentPage !== lastPageNumber &&
		<Button variant='ghost' onClick={()=>handleChangePage(lastPageNumber)}>
			<img
				alt='prev'
				srcSet={next}
			/>
		</Button>
		}
	</Box>;
};