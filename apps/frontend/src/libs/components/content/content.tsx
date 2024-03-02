import {
	getSanitizedHtml,
	getTruncatedContent,
} from "~/libs/helpers/helpers.js";

import { MAXIMUM_CONTENT_LENGTH, START_INDEX } from "./libs/constants.js";

type Properties = {
	string: string;
};

const Content: React.FC<Properties> = ({ string }: Properties) => {
	const sanitizedString = getSanitizedHtml(string);

	if (string.length <= MAXIMUM_CONTENT_LENGTH) {
		return <div dangerouslySetInnerHTML={{ __html: sanitizedString || "" }} />;
	}

	const truncatedContent = getTruncatedContent(
		string,
		START_INDEX,
		MAXIMUM_CONTENT_LENGTH,
	);

	return <div dangerouslySetInnerHTML={{ __html: truncatedContent }} />;
};

export { Content };
