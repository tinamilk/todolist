import React from 'react';
import './PagePagination.css';
import next from './img/next_icon.svg';
import prev from './img/prev_icon.svg';
import { useSelector } from 'react-redux';

export const PagePagination = () => {

	const tasks = useSelector((state) => state.tasks);
	const lastPageNumber = Math.ceil(tasks.length / 5);
	console.log(lastPageNumber);
	const pages = [];

	for (let pageNumber = 1; pageNumber <= lastPageNumber; pageNumber++) {
		pages.push(pageNumber);
	}

	console.log(pages);


	return <div className='page_pagination'>
		<img srcSet={prev} className='prev_button'/>
		{pages.length ? pages.map(page => {
			return <button className='page-number' key={page}>{page}</button>;
		}) : 0}
		<img srcSet={next} className='next_button'/>
	</div>;
};