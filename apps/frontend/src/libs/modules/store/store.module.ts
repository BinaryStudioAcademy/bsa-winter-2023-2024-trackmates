import {
	type ThunkMiddleware,
	type Tuple,
	type UnknownAction,
} from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

import { AppEnvironment } from "~/libs/enums/enums.js";
import { type Config } from "~/libs/modules/config/config.js";
import { notification } from "~/libs/modules/notification/notification.js";
import { authApi, reducer as authReducer } from "~/modules/auth/auth.js";
import {
	courseSectionsApi,
	reducer as courseSectionsReducer,
} from "~/modules/course-sections/course.sections.js";
import {
	courseApi,
	reducer as coursesReducer,
} from "~/modules/courses/courses.js";
import { filesApi } from "~/modules/files/files.js";
import {
	friendsApi,
	reducer as friendsReducer,
} from "~/modules/friends/friends.js";
import {
	userCourseApi,
	reducer as userCoursesReducer,
} from "~/modules/user-courses/user-courses.js";
import { userApi, reducer as usersReducer } from "~/modules/users/users.js";
import {
	vendorApi,
	reducer as vendorsReducer,
} from "~/modules/vendors/vendors.js";

import { storage } from "../storage/storage.js";
import { handleError } from "./middlewares/middlewares.js";

type RootReducer = {
	auth: ReturnType<typeof authReducer>;
	course: ReturnType<typeof courseSectionsReducer>;
	courses: ReturnType<typeof coursesReducer>;
	friends: ReturnType<typeof friendsReducer>;
	userCourses: ReturnType<typeof userCoursesReducer>;
	users: ReturnType<typeof usersReducer>;
	vendors: ReturnType<typeof vendorsReducer>;
};

type ExtraArguments = {
	authApi: typeof authApi;
	courseApi: typeof courseApi;
	courseSectionsApi: typeof courseSectionsApi;
	filesApi: typeof filesApi;
	friendsApi: typeof friendsApi;
	notification: typeof notification;
	storage: typeof storage;
	userApi: typeof userApi;
	userCourseApi: typeof userCourseApi;
	vendorApi: typeof vendorApi;
};

class Store {
	public instance: ReturnType<
		typeof configureStore<
			RootReducer,
			UnknownAction,
			Tuple<[ThunkMiddleware<RootReducer, UnknownAction, ExtraArguments>]>
		>
	>;

	public constructor(config: Config) {
		this.instance = configureStore({
			devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
			middleware: (getDefaultMiddleware) => {
				return getDefaultMiddleware({
					thunk: {
						extraArgument: this.extraArguments,
					},
				}).prepend(handleError);
			},
			reducer: {
				auth: authReducer,
				course: courseSectionsReducer,
				courses: coursesReducer,
				friends: friendsReducer,
				userCourses: userCoursesReducer,
				users: usersReducer,
				vendors: vendorsReducer,
			},
		});
	}

	public get extraArguments(): ExtraArguments {
		return {
			authApi,
			courseApi,
			courseSectionsApi,
			filesApi,
			friendsApi,
			notification,
			storage,
			userApi,
			userCourseApi,
			vendorApi,
		};
	}
}

export { Store };
