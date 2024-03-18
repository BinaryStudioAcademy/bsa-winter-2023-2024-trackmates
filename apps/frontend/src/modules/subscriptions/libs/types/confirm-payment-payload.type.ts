import { type Stripe, type StripeElements } from "@stripe/stripe-js";

type ConfirmPaymentPayload = {
	elements: StripeElements;
	stripe: Stripe;
};

export { type ConfirmPaymentPayload };
