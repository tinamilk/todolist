import { useToast } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { setInitial } from '../../store/modal/modal';

export const Modal = () => {
	const isModalActive = useSelector((state) => state.modal.isActive);
	const modalTitle = useSelector((state) => state.modal.title);
	const toast = useToast();

	const dispatch = useDispatch();

	if (isModalActive) {
		toast.closeAll();
		dispatch(setInitial());
		return toast({
			title: modalTitle,
			status: 'error',
			isClosable: true,
			duration: 9000
		});
	}

};