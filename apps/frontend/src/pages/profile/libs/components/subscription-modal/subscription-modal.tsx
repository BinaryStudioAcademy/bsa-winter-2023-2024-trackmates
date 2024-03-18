import { Modal } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { actions as appActions } from "~/libs/slices/app/app.js";
import {
	SubscriptionPlan,
	actions as subscriptionActions,
} from "~/modules/subscriptions/subscriptions.js";

import { SubscriptionCheckout } from "../subscription-checkout/subscription-checkout.js";
import { SubscriptionDetails } from "../subscription-details/subscription-details.js";
import styles from "./styles.module.css";

const SubscriptionModal: React.FC = () => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();
	const { clientSecret, paymentId } = useAppSelector(({ subscription }) => {
		return {
			clientSecret: subscription.clientSecret,
			dataStatus: subscription.dataStatus,
			paymentId: subscription.paymentId,
		};
	});

	const isModalOpen =
		pathname === AppRoute.SUBSCRIPTION ||
		pathname === AppRoute.SUBSCRIPTION_CHECKOUT;

	const handleCloseSubscriptionModal = useCallback(() => {
		dispatch(appActions.navigate(AppRoute.PROFILE));
	}, [dispatch]);

	const handleSubscribeIntent = useCallback(() => {
		if (!paymentId || !clientSecret) {
			void dispatch(
				subscriptionActions.createPaymentIntent({
					price: SubscriptionPlan.PRICE,
				}),
			);
		}

		dispatch(appActions.navigate(AppRoute.SUBSCRIPTION_CHECKOUT));
	}, [clientSecret, dispatch, paymentId]);

	const handleScreenRender = (screen: string): React.ReactNode => {
		switch (screen) {
			case AppRoute.SUBSCRIPTION: {
				return <SubscriptionDetails onSubscribe={handleSubscribeIntent} />;
			}

			case AppRoute.SUBSCRIPTION_CHECKOUT: {
				return <SubscriptionCheckout />;
			}
		}

		return null;
	};

	return (
		<Modal
			className={styles["subscription-modal"]}
			isCentered
			isOpen={isModalOpen}
			onClose={handleCloseSubscriptionModal}
		>
			<div className={styles["content"]}>{handleScreenRender(pathname)}</div>
		</Modal>
	);
};

export { SubscriptionModal };
