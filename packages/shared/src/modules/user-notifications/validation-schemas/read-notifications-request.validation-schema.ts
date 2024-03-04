import { z } from "zod";

import { ReadNotificationsValidationMessages } from "../enums/enums.js";

type ReadNotificationsRequestValidation = {
	notificationIds: z.ZodArray<z.ZodNumber, "atleastone">;
};

const minIdValue = 1;

const readNotifications = z.object<ReadNotificationsRequestValidation>({
	notificationIds: z
		.array(
			z.number().min(minIdValue, {
				message: ReadNotificationsValidationMessages.ID_MINIMUM_VALUE,
			}),
		)
		.nonempty({
			message: ReadNotificationsValidationMessages.ARRAY_MINIMUM_SIZE,
		}),
});

export { readNotifications };
