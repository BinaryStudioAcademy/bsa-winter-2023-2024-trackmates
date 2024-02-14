import { getApiEndpoint } from "./get-api-endpoint.helper.js";

const checkIfWhiteRoute = (url: string, whiteRoutes: string[]) => {
	const apiEndpoint = getApiEndpoint(url);

	return whiteRoutes.includes(apiEndpoint ?? "");
};

export { checkIfWhiteRoute };
