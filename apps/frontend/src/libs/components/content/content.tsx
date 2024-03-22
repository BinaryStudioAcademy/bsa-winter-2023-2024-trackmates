import {
	getSanitizedHtml,
	getTruncatedContent,
} from "~/libs/helpers/helpers.js";

import { MAXIMUM_CONTENT_LENGTH, START_INDEX } from "./libs/constants.js";

type Properties = {
	content: string;
};

const Content: React.FC<Properties> = ({ content }: Properties) => {
	const sanitizedContent = getSanitizedHtml(content);

	if (!content) {
		return <div>No Content</div>;
	}

	if (content.length <= MAXIMUM_CONTENT_LENGTH) {
		return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
	}

	const truncatedContent = getTruncatedContent(
		content,
		START_INDEX,
		MAXIMUM_CONTENT_LENGTH,
	);

	return <div dangerouslySetInnerHTML={{ __html: truncatedContent }} />;
};

export { Content };
