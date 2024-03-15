import {
	getAuthenticatedUser,
	logOut,
	sendUpdatePasswordLink,
	signIn,
	signUp,
	updatePassword,
} from "./actions.js";
import { actions } from "./auth.slice.js";

const allActions = {
	...actions,
	getAuthenticatedUser,
	logOut,
	sendUpdatePasswordLink,
	signIn,
	signUp,
	updatePassword,
};

export { reducer } from "./auth.slice.js";
export { allActions as actions };
