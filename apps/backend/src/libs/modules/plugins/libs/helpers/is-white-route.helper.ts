import { type AuthPluginOptions } from "../types/types.js";
import { getApiEndpoint } from "./get-api-endpoint.helper.js";

function isWhiteRoute(
	url: string,
	whiteRouteList: AuthPluginOptions["whiteRouteList"],
) {
	const apiEndpoint = getApiEndpoint(url);

	return whiteRouteList.includes(apiEndpoint ?? "");
}

export { isWhiteRoute };
