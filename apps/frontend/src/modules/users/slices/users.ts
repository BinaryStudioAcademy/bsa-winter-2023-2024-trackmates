import { updateProfile, updateUserAvatar } from "./actions.js";
import { actions } from "./users.slice.js";

const allActions = {
	...actions,
	updateProfile,
	updateUserAvatar,
};

export { allActions as actions };
export { reducer } from "./users.slice.js";
