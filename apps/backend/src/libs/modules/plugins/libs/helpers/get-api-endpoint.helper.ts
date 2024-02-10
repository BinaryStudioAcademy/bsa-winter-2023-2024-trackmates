export function getApiEndpoint(url: string): string | null | undefined {
	const regex = /\/api\/v\d+(\/.+)/;
	const match = url.match(regex);

	return match ? match[1] : null;
}
