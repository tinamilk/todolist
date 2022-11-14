import React from 'react';
import ReactDOM from 'react-dom/client';
import ToDoList from './TodoList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ToDoList />
	</React.StrictMode>
);
