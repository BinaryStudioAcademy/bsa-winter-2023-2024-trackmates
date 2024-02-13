import { WHITE_ROUTES } from "~/libs/modules/config/libs/constants/constants.js";

import { getApiEndpoint } from "./get-api-endpoint.helper.js";

const isWhiteRoute = (url: string) => {
	const apiEndpoint = getApiEndpoint(url);

	return WHITE_ROUTES.includes(apiEndpoint ?? "");
};

export { isWhiteRoute };
