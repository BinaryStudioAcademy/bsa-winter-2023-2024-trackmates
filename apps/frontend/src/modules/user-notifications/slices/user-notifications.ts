import { getUserNotifications } from "./actions.js";
import { actions } from "./user-notifications.slice.js";

const allActions = {
	...actions,
	getUserNotifications,
};

export { allActions as actions };
export { reducer } from "./user-notifications.slice.js";
