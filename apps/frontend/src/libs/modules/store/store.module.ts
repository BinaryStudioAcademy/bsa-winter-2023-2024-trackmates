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
	courseApi,
	reducer as coursesReducer,
} from "~/modules/courses/courses.js";

import { storage } from "../storage/storage.js";
import { handleError } from "./middlewares/middlewares.js";

type RootReducer = {
	auth: ReturnType<typeof authReducer>;
	courses: ReturnType<typeof coursesReducer>;
};

type ExtraArguments = {
	authApi: typeof authApi;
	courseApi: typeof courseApi;
	notification: typeof notification;
	storage: typeof storage;
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
				courses: coursesReducer,
			},
		});
	}

	public get extraArguments(): ExtraArguments {
		return {
			authApi,
			courseApi,
			notification,
			storage,
		};
	}
}

export { Store };
