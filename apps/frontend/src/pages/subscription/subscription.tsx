import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useCallback,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { actions as appActions } from "~/libs/slices/app/app.js";
import {
	SubscriptionPlan,
	actions as subscriptionActions,
} from "~/modules/subscriptions/subscriptions.js";

import {
	SubscriptionCheckout,
	SubscriptionDetails,
} from "./components/components.js";
import styles from "./styles.module.css";

const Subscription: React.FC = () => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();

	const handleSubscribe = useCallback(() => {
		void dispatch(
			subscriptionActions.createPaymentIntent({
				price: SubscriptionPlan.PRICE,
			}),
		);

		dispatch(appActions.navigate(AppRoute.SUBSCRIPTION_CHECKOUT));
	}, [dispatch]);

	const handleScreenRender = (screen: string): React.ReactNode => {
		switch (screen) {
			case AppRoute.SUBSCRIPTION: {
				return <SubscriptionDetails onSubscribe={handleSubscribe} />;
			}

			case AppRoute.SUBSCRIPTION_CHECKOUT: {
				return <SubscriptionCheckout />;
			}
		}

		return null;
	};

	return (
		<section className={styles["container"]}>
			{handleScreenRender(pathname)}
		</section>
	);
};

export { Subscription };
