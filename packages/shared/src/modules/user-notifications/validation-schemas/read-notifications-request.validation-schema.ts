import { z } from "zod";

import {
	NotificationsValidationMessages,
	NotificationsValidationRule,
} from "../enums/enums.js";

type ReadNotificationsRequestValidation = {
	notificationIds: z.ZodArray<z.ZodNumber, z.ArrayCardinality>;
};

const readNotifications = z.object<ReadNotificationsRequestValidation>({
	notificationIds: z
		.array(
			z.number().min(NotificationsValidationRule.ID_MINIMUM_VALUE, {
				message: NotificationsValidationMessages.ID_MINIMUM_VALUE,
			}),
		)
		.min(NotificationsValidationRule.NOTIFICATION_IDS_ARRAY_MINIMUM_LENGHT, {
			message: NotificationsValidationMessages.ARRAY_MINIMUM_SIZE,
		}),
});

export { readNotifications };
