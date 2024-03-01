import { getUserNotifications, hasUserUnreadNotifications } from "./actions.js";
import { actions } from "./user-notifications.slice.js";

const allActions = {
	...actions,
	getUserNotifications,
	hasUserUnreadNotifications,
};

export { allActions as actions };
export { reducer } from "./user-notifications.slice.js";
