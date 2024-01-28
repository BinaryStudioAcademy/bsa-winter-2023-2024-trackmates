import { signUp } from "./actions.ts";
import { actions } from "./auth.slice.ts";

const allActions = {
  ...actions,
  signUp,
};

export { allActions as actions };
export { reducer } from "./auth.slice.ts";
