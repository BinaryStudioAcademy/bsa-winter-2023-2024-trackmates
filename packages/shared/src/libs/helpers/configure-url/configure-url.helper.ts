type ConfigureUrlParameters<T extends Record<string, unknown>> = {
	path: string;
	queryParameters?: T | undefined;
};

const configureUrl = <T extends Record<string, unknown>>({
	path,
	queryParameters,
}: ConfigureUrlParameters<T>): string => {
	if (!queryParameters) {
		return path;
	}

	const query = new URLSearchParams(
		queryParameters as Record<string, string>,
	).toString();

	return `${path}?${query}`;
};

export { configureUrl };
