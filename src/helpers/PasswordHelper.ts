export const generatePassword = (lenght: number): string => {
	const characters =
		'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

	const reg = new RegExp(
		'(?=^.{10,}$)(?=(.*\\d){2})(?=(.*[A-Za-z]){2})(?=(.*[!@#$%^&*?]){2})(?!.*[\\s])^.*'
	);

	let result;

	do {
		result = '';
		for (let i = 0; i < lenght; i++) {
			result += characters.charAt(
				Math.floor(Math.random() * characters.length)
			);
		}
	} while (!reg.test(result));

	return result;
};

export const checkStrongPassword = (password: string): boolean => {
	const strongRegex = new RegExp(
		'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,})'
	);

	return strongRegex.test(password);
};
