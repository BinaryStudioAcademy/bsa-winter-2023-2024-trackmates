type CSSModuleClasses = {
	[key: string]: string;
};

const formatClassNames = (
	classNames: string,
	styles: CSSModuleClasses,
): string => {
	if (!classNames) {
		return "";
	}

	const classNamesArray = classNames.split(" ");

	const formattedClassNames = classNamesArray.map(
		(className) => styles[className],
	);

	return formattedClassNames.join(" ");
};

export { formatClassNames };
