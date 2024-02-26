import { AppRoute } from "~/libs/enums/enums.js";

const LINKS = [
	{
		title: "Find friends",
		to: AppRoute.FRIENDS,
	},
	{
		title: "Followers",
		to: AppRoute.FRIENDS_FOLLOWERS,
	},
	{
		title: "Followings",
		to: AppRoute.FRIENDS_FOLLOWINGS,
	},
];

export { LINKS };
