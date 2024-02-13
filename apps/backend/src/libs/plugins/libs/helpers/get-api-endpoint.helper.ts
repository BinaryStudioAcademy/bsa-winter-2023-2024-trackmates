const getApiEndpoint = (url: string): null | string | undefined => {
	const regex = /\/api\/v\d+(\/.+)/;
	const match = url.match(regex);

	const [, capturedValue] = match ?? [];

	return capturedValue ?? null;
};

export { getApiEndpoint };
