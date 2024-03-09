import { AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

const PAGES_WITH_SEARCH_BAR: ValueOf<typeof AppRoute>[] = [
	AppRoute.FRIENDS,
	AppRoute.FRIENDS_FOLLOWERS,
	AppRoute.FRIENDS_FOLLOWINGS,
	AppRoute.ROOT,
	AppRoute.USERS_$ID,
	AppRoute.NOTIFICATIONS,
] as const;

export { PAGES_WITH_SEARCH_BAR };
