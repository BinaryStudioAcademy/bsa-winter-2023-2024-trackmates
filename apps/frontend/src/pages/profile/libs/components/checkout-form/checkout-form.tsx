import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";

import { Button } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks.js";
import {
	SubscriptionPlan,
	actions as subscriptionActions,
} from "~/modules/subscriptions/subscriptions.js";

import styles from "./styles.module.css";

const CheckoutForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const stripe = useStripe();
	const elements = useElements();
	const { confirmPaymentDataStatus, dataStatus, paymentId } = useAppSelector(
		({ subscription }) => {
			return {
				confirmPaymentDataStatus: subscription.confirmPaymentDataStatus,
				dataStatus: subscription.dataStatus,
				paymentId: subscription.paymentId,
			};
		},
	);

	const isConfirmLoading = confirmPaymentDataStatus === DataStatus.PENDING;
	const isLoading = dataStatus === DataStatus.PENDING;
	const isDisabled = isLoading || isConfirmLoading || !stripe || !elements;

	const handleSubmitPayment = useCallback(
		(event_: React.FormEvent<HTMLFormElement>) => {
			event_.preventDefault();

			if (!stripe || !elements) {
				return;
			}

			void dispatch(
				subscriptionActions.confirmPaymentIntent({ elements, stripe }),
			);
		},
		[elements, stripe, dispatch],
	);

	const handleCancelPayment = useCallback(() => {
		if (!paymentId) {
			return;
		}

		void dispatch(subscriptionActions.cancelPaymentIntent({ id: paymentId }));
	}, [dispatch, paymentId]);

	return (
		<form className={styles["checkout-form"]} onSubmit={handleSubmitPayment}>
			<div className={styles["container"]}>
				<PaymentElement />
			</div>
			<div className={styles["actions-container"]}>
				<Button
					className={styles["action-button"]}
					isDisabled={isDisabled}
					label="Cancel"
					onClick={handleCancelPayment}
					size="small"
					style="secondary"
					type="button"
				/>
				<Button
					className={styles["action-button"]}
					isDisabled={isDisabled}
					isLoading={isConfirmLoading}
					label={`Pay $${SubscriptionPlan.PRICE}`}
					size="small"
					style="primary"
					type="submit"
				/>
			</div>
		</form>
	);
};

export { CheckoutForm };
