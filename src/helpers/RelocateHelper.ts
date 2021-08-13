const relocate = (event: any, history: any, pathname: string) => {
	event.preventDefault();

	const location = {
		pathname: pathname,
	};

	history.push(location);
};

export default relocate;
