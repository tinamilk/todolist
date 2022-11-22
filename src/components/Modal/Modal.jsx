import React from 'react';
import './Modal.css';
import close from '../../assets/img/close_icon.svg';
import { useDispatch } from 'react-redux';
import { setInitial } from '../../store/modal/modal';



export const Modal = ({title}) => {

	const dispatch = useDispatch();


	return <div className='modal'>
		<p>{title}</p>
		<button onClick={()=>dispatch(setInitial())}>
			<img className='close-modal-button' srcSet={close} alt='close'/>
		</button>
	</div>;
};
