const splitOnWord = (message: string, substring: string): string[] => {
	return message.split(new RegExp(`(${substring})`, "gi"));
};

export { splitOnWord };
