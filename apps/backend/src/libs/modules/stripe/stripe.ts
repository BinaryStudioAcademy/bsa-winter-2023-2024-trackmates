import { config } from "../config/config.js";
import { StripeService } from "./stripe.module.js";

const stripe = new StripeService({
	stripeSecretKey: config.ENV.STRIPE.SECRET_KEY,
});

export { stripe };
export { StripeService } from "./stripe.module.js";
