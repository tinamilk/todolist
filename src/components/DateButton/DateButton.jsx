import React from 'react';
import './DateButton.css';
import down from './img/arrow_down.svg';
import up from './img/arrow_up.svg';

export const DateButton = () => {
	return <div className='date_button'>
		<h3 className='date_button_title'>Sort by date</h3>
		<img className='up_icon' srcSet={up}/>
		<img className='down_icon' srcSet={down}/>
	</div>;
};