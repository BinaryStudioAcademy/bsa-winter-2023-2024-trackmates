import { getAuthenticatedUser, logOut, signIn, signUp } from "./actions.js";
import { actions } from "./auth.slice.js";

const allActions = {
	...actions,
	getAuthenticatedUser,
	logOut,
	signIn,
	signUp,
};

export { reducer } from "./auth.slice.js";
export { allActions as actions };
