import React from 'react';
import './SortByDateButtons.css';
import down from './img/arrow_down.svg';
import up from './img/arrow_up.svg';
import { useDispatch } from 'react-redux';
import { sortTasksByDateNew, sortTasksByDateOld  } from '../../store/tasksSlice';


export const SortByDateButtons = () => {

	const dispatch = useDispatch();

	return <div className='date-buttons'>
		<p className='date-button-title'>Sort by date</p>
		<button className='up-button' onClick={()=>dispatch(sortTasksByDateNew())}><img className='up-icon' srcSet={up}/></button>
		<button className='down-button' onClick={()=>dispatch(sortTasksByDateOld())}><img className='down-icon' srcSet={down}/></button>
	</div>;
};