import React from 'react';
import ReactDOM from 'react-dom/client';
import ToDoList from './TodoList';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { global } from './globalStyles/global';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
const styles = { ...theme, ...global };
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ChakraProvider theme={styles}>
				<BrowserRouter>
					<ToDoList />
				</BrowserRouter>
			</ChakraProvider>
		</Provider>
	</React.StrictMode>
);
