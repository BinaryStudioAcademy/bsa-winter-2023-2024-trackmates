import {
	getUnreadNotificationCounter,
	getUserNotifications,
	joinRoom,
	leaveRoom,
	setReadNotifications,
} from "./actions.js";
import { actions } from "./user-notifications.slice.js";

const allActions = {
	...actions,
	getUnreadNotificationCounter,
	getUserNotifications,
	joinRoom,
	leaveRoom,
	setReadNotifications,
};

export { allActions as actions };
export { reducer } from "./user-notifications.slice.js";
