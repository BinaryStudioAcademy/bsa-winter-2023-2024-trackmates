const ELLIPSIS = "...";

const getTruncatedContent = (
	content: string,
	firstIndex: number,
	length: number,
): string => {
	return content.slice(firstIndex, length) + ELLIPSIS;
};

export { getTruncatedContent };
