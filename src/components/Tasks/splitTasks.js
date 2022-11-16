const splitedTasks = [];

export const splitTasks = (unsortedTasks) => {

	let counter = 0;
	let page = 0;
 
	unsortedTasks.forEach(task => {

		if (counter === 0) {
			splitedTasks[page] = [];
		}

		splitedTasks[page].push(task);
		counter++;

		if (counter === 5) {
			page++;
			counter = 0;
		}
	});

	return splitedTasks;
	
};