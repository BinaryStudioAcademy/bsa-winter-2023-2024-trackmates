import {
	cancelPaymentIntent,
	confirmPaymentIntent,
	createPaymentIntent,
	initializeStripe,
} from "./actions.js";
import { actions } from "./subscription.slice.js";

const allActions = {
	...actions,
	cancelPaymentIntent,
	confirmPaymentIntent,
	createPaymentIntent,
	initializeStripe,
};

export { allActions as actions };
export { reducer } from "./subscription.slice.js";
