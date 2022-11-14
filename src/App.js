import React from 'react';
import { Heading } from './components/Heading/Heading';
import { Input } from './components/Input/Input';
import { FilterButton } from './components/FilterButton/FilterButton';
import { DateButton } from './components/DateButton/DateButton';
import { Task } from './components/Task/Task';

function App() {
	return (
		<div className="App">
			<Heading/>
			<Input/>
			<FilterButton/>
			<DateButton/>
			<Task/>
		</div>
	);
}

export default App;
