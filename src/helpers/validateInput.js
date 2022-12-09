export const validateInput = (e) => {
	return e && e.split(' ').join('') && e.match(/[a-zа-я0-9]/i);
};
