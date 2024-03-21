import { AppRoute } from "~/libs/enums/enums.js";
import { DEFAULT_SEARCH_MY_COURSES_PAYLOAD } from "~/modules/courses/courses.js";

const searchPagePathToDefaultValue = {
	[AppRoute.FRIENDS]: { search: "" },
	[AppRoute.FRIENDS_FOLLOWERS]: { search: "" },
	[AppRoute.FRIENDS_FOLLOWINGS]: { search: "" },
	[AppRoute.NOTIFICATIONS]: { search: "" },
	[AppRoute.ROOT]: DEFAULT_SEARCH_MY_COURSES_PAYLOAD,
} as const;

export { searchPagePathToDefaultValue };
