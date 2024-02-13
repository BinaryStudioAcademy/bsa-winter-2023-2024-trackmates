import { type FastifyRequest } from "fastify";

import { type AuthPluginOptions } from "../types/types.js";
import { getApiEndpoint } from "./get-api-endpoint.helper.js";

function isWhiteRoute(
	request: FastifyRequest,
	whiteRouteList: AuthPluginOptions["whiteRouteList"],
) {
	const apiEndpoint = getApiEndpoint(request.url);

	return whiteRouteList.includes(apiEndpoint ?? "");
}

export { isWhiteRoute };
