import { AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

const createQueryLink = (
	route: ValueOf<typeof AppRoute>,
	query: string,
	value: string,
): string => {
	return `${route}?${query}=${value}`;
};

export { createQueryLink };
