/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setModalActive } from '../../store/modal/modal';
import { validateInput } from '../../helpers/validateInput';
import { useChangeTaskMutation } from '../../store/tasksApi/tasksApi';

import {
	Input,
	IconButton,
	ButtonGroup,
	Text,
	Box,
	useMediaQuery,
} from '@chakra-ui/react';

import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

export const ChangeTitleInput = ({
	title,
	handleTitleSubmit,
	toggleEditInputDisabled,
	isEditing,
	handleIsEditingChange,
}) => {
	const [currentTitle, setCurrentTitle] = useState(title);
	const [isSmallerThan600] = useMediaQuery('(max-width: 600px)');

	const handleUnchangeTitle = () => {
		setCurrentTitle(title);
		toggleEditInputDisabled();
		handleIsEditingChange();
	};


	const handleChangeTitle = () => {
		if (validateInput(currentTitle)) {
			handleTitleSubmit(currentTitle);
		} else {
			setModalActive('No task to add :(');
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Escape') {
			handleUnchangeTitle();
		} else if (e.key === 'Enter') {
			toggleEditInputDisabled();
			handleTitleSubmit(currentTitle);
		}
	};

	return (
		<Box
			textAlign="left"
			fontSize="2xl"
			display="flex"
			flexDirection="row"
			gap="15px"
			width="50%"
			cursor="pointer"
		>
			{isEditing ? (
				<>
					<Input
						onChange={(e) => setCurrentTitle(e.target.value)}
						width="50%"
						value={currentTitle}
						height='30px'
						onKeyDown={(e) => handleKeyPress(e)}
					/>
					<ButtonGroup>
						<IconButton height='30px' icon={<AiOutlineCheck />} onClick={handleChangeTitle} />
						<IconButton
							height='30px'
							onClick={handleUnchangeTitle}
							icon={<AiOutlineClose />}
						/>
					</ButtonGroup>
				</>
			) : (
				<Text wordBreak="break-all" fontSize={isSmallerThan600 ? 'xs' : 'md'}>
					{currentTitle}
				</Text>
			)}
		</Box>
	);
};
