import { createSlice } from "@reduxjs/toolkit";
import { type Stripe } from "@stripe/stripe-js";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import {
	cancelPaymentIntent,
	confirmPaymentIntent,
	createPaymentIntent,
	initializeStripe,
} from "./actions.js";

type State = {
	clientSecret: null | string;
	confirmPaymentDataStatus: ValueOf<typeof DataStatus>;
	dataStatus: ValueOf<typeof DataStatus>;
	paymentId: null | string;
	stripe: Stripe | null;
};

const initialState: State = {
	clientSecret: null,
	confirmPaymentDataStatus: DataStatus.IDLE,
	dataStatus: DataStatus.IDLE,
	paymentId: null,
	stripe: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers: (builder) => {
		builder.addCase(createPaymentIntent.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(createPaymentIntent.fulfilled, (state, action) => {
			state.paymentId = action.payload.id;
			state.clientSecret = action.payload.clientSecret;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(createPaymentIntent.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(confirmPaymentIntent.pending, (state) => {
			state.confirmPaymentDataStatus = DataStatus.PENDING;
		});

		builder.addCase(confirmPaymentIntent.fulfilled, (state) => {
			state.confirmPaymentDataStatus = DataStatus.FULFILLED;
			state.clientSecret = null;
		});

		builder.addCase(confirmPaymentIntent.rejected, (state) => {
			state.confirmPaymentDataStatus = DataStatus.REJECTED;
		});
		builder.addCase(cancelPaymentIntent.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(cancelPaymentIntent.fulfilled, (state) => {
			state.paymentId = null;
			state.clientSecret = null;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(initializeStripe.fulfilled, (state, action) => {
			state.stripe = action.payload;
		});
	},
	initialState,
	name: "subscription",
	reducers: {},
});

export { actions, name, reducer };
