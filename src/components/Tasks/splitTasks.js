const splitedTasks = {};

export const splitTasks = (unsortedTasks) => {

	let counter = 1;
	let page = 1;
 
	unsortedTasks.forEach(task => {

		if (counter === 1) {
			splitedTasks[page] = [];
		}

		splitedTasks[page].push(task);
		counter++;

		if (counter === 6) {
			page++;
			counter = 1;
		}
	});

	return splitedTasks;
	
};