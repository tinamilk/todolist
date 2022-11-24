import React from 'react';
import ReactDOM from 'react-dom/client';
import ToDoList from './TodoList';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ChakraProvider, theme } from '@chakra-ui/react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<ToDoList />
			</ChakraProvider>
		</Provider>
	</React.StrictMode>
);
