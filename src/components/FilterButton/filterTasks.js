export const filters = {
	ALL: '', 
	DONE: 'done',
	UNDONE: 'undone'
};

export const filterTasks = (unfilteredTasks, filter) => {
	switch(filter) {
	case filters['UNDONE']:

		return unfilteredTasks.some(task => task.isDone === false);

	case filters['DONE']:

		return unfilteredTasks.some(task => task.isDone === true);

	default:

		return unfilteredTasks;
	}
};