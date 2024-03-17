import {
	forgotPassword,
	getAuthenticatedUser,
	logOut,
	signIn,
	signUp,
	updatePassword,
} from "./actions.js";
import { actions } from "./auth.slice.js";

const allActions = {
	...actions,
	forgotPassword,
	getAuthenticatedUser,
	logOut,
	signIn,
	signUp,
	updatePassword,
};

export { reducer } from "./auth.slice.js";
export { allActions as actions };
