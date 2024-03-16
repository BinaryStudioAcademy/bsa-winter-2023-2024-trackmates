import Stripe from "stripe";

import { SMALLEST_CURRENCY_UNIT_MULTIPLIER } from "./libs/constants/constants.js";
import {
	Currency,
	PaymentIntentStatus,
	PaymentMethodType,
} from "./libs/enums/enums.js";

type Constructor = {
	stripeSecretKey: string;
};

class StripeService {
	private readonly stripeApi: Stripe;

	private readonly stripeSecretKey: string;

	public constructor({ stripeSecretKey }: Constructor) {
		this.stripeSecretKey = stripeSecretKey;
		this.stripeApi = new Stripe(this.stripeSecretKey);
	}

	private getPriceInSmallestCurrencyUnit(amount: number): number {
		return amount * SMALLEST_CURRENCY_UNIT_MULTIPLIER;
	}

	public async cancelPaymentIntent(id: string): Promise<boolean> {
		const { status } = await this.stripeApi.paymentIntents.cancel(id);

		return status === PaymentIntentStatus.CANCELED;
	}

	public async createPaymentIntent({
		price,
	}: {
		price: number;
	}): Promise<{ clientSecret: string; id: string }> {
		const { client_secret: clientSecret, id } =
			await this.stripeApi.paymentIntents.create({
				amount: this.getPriceInSmallestCurrencyUnit(price),
				currency: Currency.USD,
				payment_method_types: [PaymentMethodType.CARD],
			});

		return { clientSecret: clientSecret as string, id };
	}
}

export { StripeService };
