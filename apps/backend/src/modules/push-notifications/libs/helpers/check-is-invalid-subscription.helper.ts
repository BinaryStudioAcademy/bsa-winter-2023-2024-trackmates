import { WebPushError } from "web-push";

import { HTTPCode } from "~/libs/enums/enums.js";

const checkIsInvalidSubscription = (error: unknown): boolean => {
	return error instanceof WebPushError && error.statusCode === HTTPCode.GONE;
};

export { checkIsInvalidSubscription };
