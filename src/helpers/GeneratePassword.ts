const generatePassword = (lenght: number): string => {
	const characters =
		'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%*?&';

	const reg = new RegExp(
		'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{10,}$'
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

export default generatePassword;
