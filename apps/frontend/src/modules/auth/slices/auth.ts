import { getAuthenticatedUser, signIn, signUp } from "./actions.js";
import { actions } from "./auth.slice.js";

const allActions = {
	...actions,
	getAuthenticatedUser,
	signIn,
	signUp,
};

export { reducer } from "./auth.slice.js";
export { allActions as actions };
