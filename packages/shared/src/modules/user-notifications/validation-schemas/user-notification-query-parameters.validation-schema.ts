import { z } from "zod";

import { type ValueOf } from "../../../libs/types/types.js";
import { NotificationFilter } from "../enums/enums.js";

type NotificationQueryParametersValidation = {
	search: z.ZodOptional<z.ZodString>;
	type: z.ZodOptional<
		z.ZodEnum<
			[
				ValueOf<typeof NotificationFilter>,
				...ValueOf<typeof NotificationFilter>[],
			]
		>
	>;
};

const userNotificationQueryParameters =
	z.object<NotificationQueryParametersValidation>({
		search: z.string().trim().optional(),
		type: z
			.enum([
				NotificationFilter.ALL,
				NotificationFilter.COMMENTS,
				NotificationFilter.FOLLOWERS,
				NotificationFilter.LIKES,
			])
			.optional(),
	});

export { userNotificationQueryParameters };
