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
import { filesApi } from "~/modules/files/files.js";
import {
	friendsApi,
	reducer as friendsReducer,
} from "~/modules/friends/friends.js";
import {
	userNotificationsApi,
	reducer as userNotificationsReducer,
} from "~/modules/user-notifications/user-notifications.js";
import { userApi } from "~/modules/users/users.js";

import { storage } from "../storage/storage.js";
import { handleError } from "./middlewares/middlewares.js";

type RootReducer = {
	auth: ReturnType<typeof authReducer>;
	friends: ReturnType<typeof friendsReducer>;
	userNotifications: ReturnType<typeof userNotificationsReducer>;
};

type ExtraArguments = {
	authApi: typeof authApi;
	filesApi: typeof filesApi;
	friendsApi: typeof friendsApi;
	notification: typeof notification;
	storage: typeof storage;
	userApi: typeof userApi;
	userNotificationsApi: typeof userNotificationsApi;
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
				friends: friendsReducer,
				userNotifications: userNotificationsReducer,
			},
		});
	}

	public get extraArguments(): ExtraArguments {
		return {
			authApi,
			filesApi,
			friendsApi,
			notification,
			storage,
			userApi,
			userNotificationsApi,
		};
	}
}

export { Store };
