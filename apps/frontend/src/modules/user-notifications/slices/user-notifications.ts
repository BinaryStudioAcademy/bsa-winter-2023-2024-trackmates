import {
	getUserNotifications,
	hasUserUnreadNotifications,
	setReadNotifications,
} from "./actions.js";
import { actions } from "./user-notifications.slice.js";

const allActions = {
	...actions,
	getUserNotifications,
	hasUserUnreadNotifications,
	setReadNotifications,
};

export { allActions as actions };
export { reducer } from "./user-notifications.slice.js";
