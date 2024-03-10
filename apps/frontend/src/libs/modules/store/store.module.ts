import {
	type ThunkMiddleware,
	type Tuple,
	type UnknownAction,
} from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

import { AppEnvironment } from "~/libs/enums/enums.js";
import { type Config } from "~/libs/modules/config/config.js";
import { notification } from "~/libs/modules/notification/notification.js";
import { socket } from "~/libs/modules/socket/socket.js";
import { reducer as appReducer } from "~/libs/slices/app/app.js";
import {
	activitiesApi,
	reducer as activitiesReducer,
} from "~/modules/activities/activities.js";
import { authApi, reducer as authReducer } from "~/modules/auth/auth.js";
import {
	chatMessagesApi,
	reducer as chatMessagesReducer,
} from "~/modules/chat-messages/chat-messages.js";
import { chatsApi, reducer as chatsReducer } from "~/modules/chats/chats.js";
import { commentApi } from "~/modules/comments/comments.js";
import {
	courseSectionsApi,
	reducer as courseSectionsReducer,
} from "~/modules/course-sections/course-sections.js";
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
	groupsApi,
	reducer as groupsReducer,
} from "~/modules/groups/groups.js";
import {
	permissionsApi,
	reducer as permissionsReducer,
} from "~/modules/permissions/permissions.js";
import {
	sectionStatusApi,
	reducer as sectionStatusesReducer,
} from "~/modules/section-statuses/section-statuses.js";
import {
	userCourseApi,
	reducer as userCoursesReducer,
} from "~/modules/user-courses/user-courses.js";
import {
	userNotificationsApi,
	reducer as userNotificationsReducer,
} from "~/modules/user-notifications/user-notifications.js";
import { userApi, reducer as usersReducer } from "~/modules/users/users.js";
import {
	vendorApi,
	reducer as vendorsReducer,
} from "~/modules/vendors/vendors.js";

import { storage } from "../storage/storage.js";
import {
	chatSocket,
	handleError,
	notificationsSocket,
} from "./middlewares/middlewares.js";

type RootReducer = {
	activities: ReturnType<typeof activitiesReducer>;
	app: ReturnType<typeof appReducer>;
	auth: ReturnType<typeof authReducer>;
	chatMessages: ReturnType<typeof chatMessagesReducer>;
	chats: ReturnType<typeof chatsReducer>;
	course: ReturnType<typeof courseSectionsReducer>;
	courses: ReturnType<typeof coursesReducer>;
	friends: ReturnType<typeof friendsReducer>;
	groups: ReturnType<typeof groupsReducer>;
	permissions: ReturnType<typeof permissionsReducer>;
	sectionStatuses: ReturnType<typeof sectionStatusesReducer>;
	userCourses: ReturnType<typeof userCoursesReducer>;
	userNotifications: ReturnType<typeof userNotificationsReducer>;
	users: ReturnType<typeof usersReducer>;
	vendors: ReturnType<typeof vendorsReducer>;
};

type ExtraArguments = {
	activitiesApi: typeof activitiesApi;
	authApi: typeof authApi;
	chatMessagesApi: typeof chatMessagesApi;
	chatsApi: typeof chatsApi;
	commentApi: typeof commentApi;
	courseApi: typeof courseApi;
	courseSectionsApi: typeof courseSectionsApi;
	filesApi: typeof filesApi;
	friendsApi: typeof friendsApi;
	groupsApi: typeof groupsApi;
	notification: typeof notification;
	permissionsApi: typeof permissionsApi;
	sectionStatusApi: typeof sectionStatusApi;
	socket: typeof socket;
	storage: typeof storage;
	userApi: typeof userApi;
	userCourseApi: typeof userCourseApi;
	userNotificationsApi: typeof userNotificationsApi;
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
				}).prepend([
					handleError,
					chatSocket({ extra: this.extraArguments }),
					notificationsSocket({ extra: this.extraArguments }),
				]);
			},
			reducer: {
				activities: activitiesReducer,
				app: appReducer,
				auth: authReducer,
				chatMessages: chatMessagesReducer,
				chats: chatsReducer,
				course: courseSectionsReducer,
				courses: coursesReducer,
				friends: friendsReducer,
				groups: groupsReducer,
				permissions: permissionsReducer,
				sectionStatuses: sectionStatusesReducer,
				userCourses: userCoursesReducer,
				userNotifications: userNotificationsReducer,
				users: usersReducer,
				vendors: vendorsReducer,
			},
		});
	}

	public get extraArguments(): ExtraArguments {
		return {
			activitiesApi,
			authApi,
			chatMessagesApi,
			chatsApi,
			commentApi,
			courseApi,
			courseSectionsApi,
			filesApi,
			friendsApi,
			groupsApi,
			notification,
			permissionsApi,
			sectionStatusApi,
			socket,
			storage,
			userApi,
			userCourseApi,
			userNotificationsApi,
			vendorApi,
		};
	}
}

export { type ExtraArguments };
export { Store };
