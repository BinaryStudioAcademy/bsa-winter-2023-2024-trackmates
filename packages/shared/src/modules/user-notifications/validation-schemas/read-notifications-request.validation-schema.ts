import { z } from "zod";

import {
	NotificationValidationMessage,
	NotificationValidationRule,
} from "../enums/enums.js";

type ReadNotificationsRequestValidation = {
	notificationIds: z.ZodArray<z.ZodNumber, z.ArrayCardinality>;
};

const readNotificationsRequest = z.object<ReadNotificationsRequestValidation>({
	notificationIds: z
		.array(
			z.number().min(NotificationValidationRule.ID_MINIMUM_VALUE, {
				message: NotificationValidationMessage.ID_MINIMUM_VALUE,
			}),
		)
		.min(NotificationValidationRule.NOTIFICATION_IDS_ARRAY_MINIMUM_LENGTH, {
			message: NotificationValidationMessage.ARRAY_MINIMUM_SIZE,
		}),
});

export { readNotificationsRequest };
