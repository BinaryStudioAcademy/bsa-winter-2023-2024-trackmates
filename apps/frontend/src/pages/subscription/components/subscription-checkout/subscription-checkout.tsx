import { Elements } from "@stripe/react-stripe-js";
import { type StripeElementsOptions, loadStripe } from "@stripe/stripe-js";

import { Loader, Navigate } from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { config } from "~/libs/modules/config/config.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { CheckoutForm } from "../checkout-form/checkout-form.js";

const stripePromise = loadStripe(config.ENV.STRIPE.PUBLIC_KEY);

const SubscriptionCheckout: React.FC = () => {
	const { clientSecret, isLoading, user } = useAppSelector(
		({ auth, subscription }) => {
			return {
				clientSecret: subscription.clientSecret,
				isLoading: subscription.dataStatus === DataStatus.PENDING,
				user: auth.user as UserAuthResponseDto,
			};
		},
	);

	const hasSubscription = Boolean(user.subscription);

	const options: StripeElementsOptions = {
		clientSecret: clientSecret as string,
	};

	if (hasSubscription) {
		return <Navigate to={AppRoute.SUBSCRIPTION} />;
	}

	if (isLoading) {
		return <Loader color="orange" size="large" />;
	}

	return (
		<>
			{Boolean(clientSecret) && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			)}
		</>
	);
};

export { SubscriptionCheckout };
