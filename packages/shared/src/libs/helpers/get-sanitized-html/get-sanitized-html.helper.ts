import sanitizeHtml from "sanitize-html";

const getSanitizedHtml = (content: string): string => {
	return sanitizeHtml(content);
};

export { getSanitizedHtml };
