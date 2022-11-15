import React from 'react';
import './SortByDateButtons.css';
import down from './img/arrow_down.svg';
import up from './img/arrow_up.svg';

export const SortByDateButtons = () => {
	return <div className='date-buttons'>
		<p className='date-button-title'>Sort by date</p>
		<button className='up-button'><img className='up-icon' srcSet={up}/></button>
		<button className='down-button'><img className='down-icon' srcSet={down}/></button>
	</div>;
};