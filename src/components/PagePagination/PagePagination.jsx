import React from 'react';
import './PagePagination.css';
import next from './img/next_icon.svg';
import prev from './img/prev_icon.svg';

export const PagePagination = () => {
	return <div className='page_pagination'>
		<img srcSet={prev} className='prev_button'/>
		<div className='page_number'>1</div>
		<div className='page_number'>2</div>
		<div className='page_number'>3</div>
		<div className='page_number'>4</div>
		<div className='page_number'>5</div>
		<img srcSet={next} className='next_button'/>
	</div>;
};