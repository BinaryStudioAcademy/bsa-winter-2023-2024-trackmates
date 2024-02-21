import { z } from "zod";

type MessageSendValidationDto = {
	message: z.ZodString;
	receiverId: z.ZodNumber;
};

const messageSend = z
	.object<MessageSendValidationDto>({
		message: z.string().trim(),
		receiverId: z.number(),
	})
	.required();

export { messageSend };
