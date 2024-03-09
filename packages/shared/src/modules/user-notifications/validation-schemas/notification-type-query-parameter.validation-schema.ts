import { z } from "zod";

import { type ValueOf } from "../../../libs/types/types.js";
import { NotificationFilter } from "../enums/enums.js";

type NotificationTypeQueryParameterValidation = {
	type: z.ZodOptional<
		z.ZodEnum<
			[
				ValueOf<typeof NotificationFilter>,
				...ValueOf<typeof NotificationFilter>[],
			]
		>
	>;
};

const notificationTypeQueryParameter =
	z.object<NotificationTypeQueryParameterValidation>({
		type: z
			.enum([
				NotificationFilter.ALL,
				NotificationFilter.COMMENTS,
				NotificationFilter.FOLLOWERS,
				NotificationFilter.LIKES,
			])
			.optional(),
	});

export { notificationTypeQueryParameter };
