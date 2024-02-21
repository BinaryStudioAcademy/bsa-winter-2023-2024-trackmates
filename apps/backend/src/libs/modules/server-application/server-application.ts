import { config } from "~/libs/modules/config/config.js";
import { database } from "~/libs/modules/database/database.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { token } from "~/libs/modules/token/token.js";
import { authController } from "~/modules/auth/auth.js";
import { courseController } from "~/modules/courses/courses.js";
import { userCourseController } from "~/modules/user-courses/user-courses.js";
import { userService } from "~/modules/users/users.js";
import { vendorController } from "~/modules/vendors/vendors.js";

import { BaseServerApplication } from "./base-server-application.js";
import { BaseServerApplicationApi } from "./base-server-application-api.js";

const apiV1 = new BaseServerApplicationApi(
	"v1",
	config,
	...authController.routes,
	...courseController.routes,
	...vendorController.routes,
	...userCourseController.routes,
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

export { serverApplication };
export { type ServerApplicationRouteParameters } from "./libs/types/types.js";
