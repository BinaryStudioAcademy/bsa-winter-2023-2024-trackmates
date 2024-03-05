import {
	checkHasUserUnreadNotifications,
	getUserNotifications,
	setReadNotifications,
} from "./actions.js";
import { actions } from "./user-notifications.slice.js";

const allActions = {
	...actions,
	checkHasUserUnreadNotifications,
	getUserNotifications,
	setReadNotifications,
};

export { allActions as actions };
export { reducer } from "./user-notifications.slice.js";
