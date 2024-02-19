import {
	getAuthenticatedUser,
	signIn,
	signUp,
	updateProfile,
	updateUserAvatar,
} from "./actions.js";
import { actions } from "./auth.slice.js";

const allActions = {
	...actions,
	getAuthenticatedUser,
	signIn,
	signUp,
	updateProfile,
	updateUserAvatar,
};

export { reducer } from "./auth.slice.js";
export { allActions as actions };
