import React, { useState } from 'react';
import { setModalActive } from '../../store/modal/modal';
import { validateInput } from '../../helpers/validateInput';

import {
	Input,
	IconButton,
	ButtonGroup,
	Text,
	Box,
	useMediaQuery,
} from '@chakra-ui/react';

import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

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
		toggleEditInputDisabled(false);
		setCurrentTitle(title);
		handleIsEditingChange(false);
	};

	const handleChangeTitle = () => {
		if (validateInput(currentTitle)) {
			toggleEditInputDisabled(false);
			handleTitleSubmit(currentTitle);
		} else {
			setModalActive('Title is empty');
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Escape') {
			handleUnchangeTitle();
		} else if (e.key === 'Enter') {
			toggleEditInputDisabled(false);
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
						height="30px"
						onKeyDown={(e) => handleKeyPress(e)}
					/>
					<ButtonGroup>
						<IconButton
							height="30px"
							icon={<CheckIcon />}
							onClick={handleChangeTitle}
						/>
						<IconButton
							height="30px"
							onClick={handleUnchangeTitle}
							icon={<CloseIcon />}
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
