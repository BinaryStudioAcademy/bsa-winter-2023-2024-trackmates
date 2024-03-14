import { type Middleware, isRejected } from "@reduxjs/toolkit";

import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { ExceptionMessage } from "~/libs/enums/enums.js";
import { notification } from "~/libs/modules/notification/notification.js";

const handleError: Middleware = () => {
	return (next) => {
		return (action) => {
			if (isRejected(action)) {
				const errorMessage =
					action.error.message ?? ExceptionMessage.UNKNOWN_ERROR;

				notification.error(
					errorMessage.length > EMPTY_LENGTH
						? errorMessage
						: ExceptionMessage.SOMETHING_WENT_WRONG,
				);
			}

			return next(action);
		};
	};
};

export { handleError };
