import { z } from "zod";

import {
	SubscriptionValidationMessage,
	SubscriptionValidationRule,
} from "../enums/enums.js";

const createPaymentIntent = z
	.object({
		price: z
			.number()
			.min(
				SubscriptionValidationRule.MIN_PRICE_VALUE,
				SubscriptionValidationMessage.MIN_PRICE_VALUE,
			),
	})
	.required();

export { createPaymentIntent };
