export const filters = {
	ALL: 'all', 
	DONE: 'done',
	UNDONE: 'undone'
};

export const filterTasks = (unfilteredTasks, filter) => {
	switch(filter) {
	case filters['UNDONE']:

		return unfilteredTasks.filter(task => task.isDone === false);

	case filters['DONE']:

		return unfilteredTasks.filter(task => task.isDone === true);

	default:

		return unfilteredTasks;
	}
};