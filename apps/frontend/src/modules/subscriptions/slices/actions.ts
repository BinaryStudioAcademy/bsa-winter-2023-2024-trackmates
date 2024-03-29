import { createAsyncThunk } from "@reduxjs/toolkit";
import { type Stripe, loadStripe } from "@stripe/stripe-js";

import { AppRoute } from "~/libs/enums/enums.js";
import { config } from "~/libs/modules/config/config.js";
import { NotificationMessage } from "~/libs/modules/notification/notification.js";
import { actions as appActions } from "~/libs/slices/app/app.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type SubscriptionPaymentIntentCreateRequestDto,
	type SubscriptionPaymentIntentCreateResponseDto,
} from "~/modules/subscriptions/subscriptions.js";

import { StripeError } from "../libs/enums/enums.js";
import {
	type ConfirmPaymentPayload,
	type SubscriptionResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./subscription.slice.js";

const createPaymentIntent = createAsyncThunk<
	SubscriptionPaymentIntentCreateResponseDto,
	SubscriptionPaymentIntentCreateRequestDto,
	AsyncThunkConfig
>(`${sliceName}/create-payment-intent`, async (payload, { extra }) => {
	const { subscriptionApi } = extra;

	return await subscriptionApi.createPaymentIntent(payload);
});

const cancelPaymentIntent = createAsyncThunk<
	unknown,
	{ id: string },
	AsyncThunkConfig
>(`${sliceName}/cancel-payment-intent`, (payload, { dispatch, extra }) => {
	const { subscriptionApi } = extra;

	void subscriptionApi.cancelPaymentIntent(payload);
	dispatch(appActions.navigate(AppRoute.SUBSCRIPTION));
});

const confirmPaymentIntent = createAsyncThunk<
	SubscriptionResponseDto | null,
	ConfirmPaymentPayload,
	AsyncThunkConfig
>(
	`${sliceName}/confirm-payment-intent`,
	async (payload, { dispatch, extra, rejectWithValue }) => {
		const { elements, stripe } = payload;
		const { notification, subscriptionApi } = extra;

		const { error } = await stripe.confirmPayment({
			elements,
			redirect: "if_required",
		});

		const hasError =
			error &&
			(error.type === StripeError.CARD_ERROR ||
				error.type === StripeError.VALIDATION_ERROR);

		if (hasError) {
			notification.error(error.message as string);

			return rejectWithValue(null);
		}

		const subscription = await subscriptionApi.subscribe();
		dispatch(appActions.navigate(AppRoute.PROFILE));

		notification.success(NotificationMessage.SUBSCRIPTION_SUCCESS);

		return subscription;
	},
);

const initializeStripe = createAsyncThunk<
	Stripe | null,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/initialize-stripe`, async () => {
	return await loadStripe(config.ENV.STRIPE.PUBLIC_KEY);
});

export {
	cancelPaymentIntent,
	confirmPaymentIntent,
	createPaymentIntent,
	initializeStripe,
};
