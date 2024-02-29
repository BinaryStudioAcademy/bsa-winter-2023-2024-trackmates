import sanitizeHtml from "sanitize-html";

type Properties = {
	string: string;
};

const Content: React.FC<Properties> = ({ string }: Properties) => {
	const sanitizedString = sanitizeHtml(string);

	return <div dangerouslySetInnerHTML={{ __html: sanitizedString || "" }} />;
};

export { Content };
