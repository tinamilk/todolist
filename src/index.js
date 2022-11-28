import React from 'react';
import ReactDOM from 'react-dom/client';
import ToDoList from './TodoList';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { global } from './globalStyles/global';

const root = ReactDOM.createRoot(document.getElementById('root'));
const styles = { ...theme, ...global };
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ChakraProvider theme={styles}>
				<ToDoList />
			</ChakraProvider>
		</Provider>
	</React.StrictMode>
);
