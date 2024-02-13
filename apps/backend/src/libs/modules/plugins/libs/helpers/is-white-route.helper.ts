import { getApiEndpoint } from "./get-api-endpoint.helper.js";

function isWhiteRoute(url: string, whiteRouteList: string[]) {
	const apiEndpoint = getApiEndpoint(url);

	return whiteRouteList.includes(apiEndpoint ?? "");
}

export { isWhiteRoute };
