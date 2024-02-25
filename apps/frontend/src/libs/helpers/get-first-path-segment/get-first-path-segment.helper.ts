const getFirstPathSegment = (path: string): string => {
	const match = /^\/(?<segment>[^/]+)/.exec(path);

	return match?.groups?.["segment"] ? `/${match.groups["segment"]}` : "/";
};

export { getFirstPathSegment };
