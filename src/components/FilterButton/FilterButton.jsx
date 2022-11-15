import React from 'react';
import './FilterButton.css';

export const FilterButton = () => {
	return <div className='filter_button'>
		<div className='all_filter'>all</div>
		<div className='done_filter'>done</div>
		<div className='undone_filter'>undone</div>
	</div>;
};