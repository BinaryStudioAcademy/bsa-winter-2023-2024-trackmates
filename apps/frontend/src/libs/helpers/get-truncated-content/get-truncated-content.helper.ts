const getTruncatedContent = (
	content: string,
	firstIndex: number,
	length: number,
): string => {
	const ELLIPSIS = "...";

	return content.slice(firstIndex, length) + ELLIPSIS;
};

export { getTruncatedContent };
