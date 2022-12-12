import React from 'react';
import './globalStyles/fonts/stylesheet.css';
import { Modal } from './components/Modal/Modal';
import { Box, Text } from '@chakra-ui/react';
import { Registration } from './pages/Registation';
import { Routes, Route } from 'react-router-dom';
import { TasksPage } from './pages/TasksPage';

function ToDoList() {
	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			backgroundColor="#fff"
			width="80vw"
			minHeight="75vh"
			margin="5vh auto"
			padding="5vh 0"
			boxShadow="0px 1px 9px 0px rgba(34, 60, 80, 0.15)"
		>
			<Text as="h1">ToDo List</Text>
			<Routes>
				<Route path="/todolist" element={<TasksPage />} />
				<Route path="/auth" element={<Registration />} />
			</Routes>
			<Modal />
		</Box>
	);
}

export default ToDoList;
