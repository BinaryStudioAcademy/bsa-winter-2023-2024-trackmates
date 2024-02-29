import { config } from "~/libs/modules/config/config.js";
import { database } from "~/libs/modules/database/database.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { token } from "~/libs/modules/token/token.js";
import { authController } from "~/modules/auth/auth.js";
import { chatMessageController } from "~/modules/chat-messages/chat-messages.js";
import { chatController } from "~/modules/chats/chats.js";
import { courseSectionController } from "~/modules/course-sections/course-sections.js";
import { courseController } from "~/modules/courses/courses.js";
import { fileController } from "~/modules/files/files.js";
import { friendController } from "~/modules/friends/friends.js";
import { userCourseController } from "~/modules/user-courses/user-courses.js";
import { userNotificationController } from "~/modules/user-notifications/user-notifications.js";
import { userController, userService } from "~/modules/users/users.js";
import { vendorController } from "~/modules/vendors/vendors.js";

import { BaseServerApplication } from "./base-server-application.js";
import { BaseServerApplicationApi } from "./base-server-application-api.js";

const apiV1 = new BaseServerApplicationApi(
	"v1",
	config,
	...authController.routes,
	...courseController.routes,
	...chatController.routes,
	...chatMessageController.routes,
	...vendorController.routes,
	...userCourseController.routes,
	...fileController.routes,
	...friendController.routes,
	...userController.routes,
	...userNotificationController.routes,
	...courseSectionController.routes,
);
const serverApplication = new BaseServerApplication({
	apis: [apiV1],
	config,
	database,
	logger,
	services: { userService },
	title: "TrackMates",
	token,
});

export { type ServerApplicationRouteParameters } from "./libs/types/types.js";
export { serverApplication };
