import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInitial } from '../store/modal/modal';

export const useModal = () => {
	const isModalActive = useSelector((state) => state.modal.isActive);
	const modalTitle = useSelector((state) => state.modal.title);

	const dispatch = useDispatch();

	useEffect(() => {
		setTimeout(() => {
			dispatch(setInitial());
		}, 3000);
	}, [isModalActive]);

	return {isModalActive, modalTitle};
};