import { AppRoute } from "../enums/enums.js";
import { type ValueOf } from "../types/types.js";

const PAGES_WITHOUT_SEARCH_BAR: ValueOf<typeof AppRoute>[] = [
	AppRoute.PROFILE,
] as const;

export { PAGES_WITHOUT_SEARCH_BAR };
