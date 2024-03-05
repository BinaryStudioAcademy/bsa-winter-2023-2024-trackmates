import { z } from "zod";

import {
	ReadNotificationsValidationMessages,
	ReadNotificationsValidationRule,
} from "../enums/enums.js";

type ReadNotificationsRequestValidation = {
	notificationIds: z.ZodArray<z.ZodNumber, z.ArrayCardinality>;
};

const readNotifications = z.object<ReadNotificationsRequestValidation>({
	notificationIds: z
		.array(
			z.number().min(ReadNotificationsValidationRule.ID_MINIMUM_VALUE, {
				message: ReadNotificationsValidationMessages.ID_MINIMUM_VALUE,
			}),
		)
		.min(
			ReadNotificationsValidationRule.NOTIFICATION_IDS_ARRAY_MINIMUM_LENGHT,
			{
				message: ReadNotificationsValidationMessages.ARRAY_MINIMUM_SIZE,
			},
		),
});

export { readNotifications };
