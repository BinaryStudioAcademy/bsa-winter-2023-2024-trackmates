import { type Middleware, isRejected } from "@reduxjs/toolkit";

import { ExceptionMessage } from "~/libs/enums/enums.js";
import { notification } from "~/libs/modules/notification/notification.js";

const handleError: Middleware = () => {
	return (next) => {
		return (action) => {
			if (isRejected(action)) {
				const errorMessage =
					action.error.message ?? ExceptionMessage.UNKNOWN_ERROR;

				notification.error(errorMessage);
			}

			return next(action);
		};
	};
};

export { handleError };
