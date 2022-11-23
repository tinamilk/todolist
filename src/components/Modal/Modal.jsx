import React from 'react';
import './Modal.css';
import close from '../../assets/img/close_icon.svg';
import { useDispatch } from 'react-redux';
import { setInitial } from '../../store/modal/modal';



export const Modal = ({title}) => {

	const dispatch = useDispatch();


	return <div className='modal'>
		<button onClick={()=>dispatch(setInitial())} className='close-modal-button'>
			<img className='close-modal-icon' srcSet={close} alt='close'/>
		</button>
		<p className='modal-message'>{title}</p>
	</div>;
};
