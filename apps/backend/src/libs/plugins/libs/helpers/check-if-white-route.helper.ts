import { WHITE_ROUTES } from "~/libs/modules/server-application/server-application.js";

import { getApiEndpoint } from "./get-api-endpoint.helper.js";

const checkIfWhiteRoute = (url: string) => {
	const apiEndpoint = getApiEndpoint(url);

	return WHITE_ROUTES.includes(apiEndpoint ?? "");
};

export { checkIfWhiteRoute };
