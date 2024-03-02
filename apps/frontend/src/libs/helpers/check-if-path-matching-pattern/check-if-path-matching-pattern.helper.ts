import { matchPath } from "react-router-dom";

import { type AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

const checkIfPathMatchingPattern = (
	path: string,
	pattern: ValueOf<typeof AppRoute>,
): boolean => {
	return Boolean(matchPath(pattern, path));
};

export { checkIfPathMatchingPattern };
