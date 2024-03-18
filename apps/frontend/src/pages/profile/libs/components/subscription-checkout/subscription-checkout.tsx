import { Elements } from "@stripe/react-stripe-js";
import { type StripeElementsOptions } from "@stripe/stripe-js";

import { Loader, Navigate } from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as subscriptionActions } from "~/modules/subscriptions/subscriptions.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { CheckoutForm } from "../checkout-form/checkout-form.js";

const SubscriptionCheckout: React.FC = () => {
	const dispatch = useAppDispatch();
	const { clientSecret, isLoading, stripe, user } = useAppSelector(
		({ auth, subscription }) => {
			return {
				clientSecret: subscription.clientSecret,
				isLoading: subscription.dataStatus === DataStatus.PENDING,
				stripe: subscription.stripe,
				user: auth.user as UserAuthResponseDto,
			};
		},
	);

	useEffect(() => {
		if (!stripe) {
			void dispatch(subscriptionActions.initializeStripe());
		}
	}, [dispatch, stripe]);

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
				<Elements options={options} stripe={stripe}>
					<CheckoutForm />
				</Elements>
			)}
		</>
	);
};

export { SubscriptionCheckout };
