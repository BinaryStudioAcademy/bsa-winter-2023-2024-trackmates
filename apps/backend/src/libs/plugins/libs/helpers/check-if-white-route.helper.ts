import { getApiEndpoint } from "./get-api-endpoint.helper.js";

const checkIfWhiteRoute = (url: string, whiteRoutes: string[]) => {
	const apiEndpoint = getApiEndpoint(url);

	if (!apiEndpoint) {
		return true;
	}

	return whiteRoutes.includes(apiEndpoint);
};

export { checkIfWhiteRoute };
