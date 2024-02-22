import {
	type ThunkMiddleware,
	type Tuple,
	type UnknownAction,
} from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

import { AppEnvironment } from "~/libs/enums/enums.js";
import { type Config } from "~/libs/modules/config/config.js";
import { notification } from "~/libs/modules/notification/notification.js";
import { reducer as appReducer } from "~/modules/app/app.js";
import { authApi, reducer as authReducer } from "~/modules/auth/auth.js";
import {
	chatMessageApi,
	reducer as chatMessageReducer,
} from "~/modules/chat-message/chat-message.js";

import { storage } from "../storage/storage.js";
import { handleError } from "./middlewares/middlewares.js";

type RootReducer = {
	app: ReturnType<typeof appReducer>;
	auth: ReturnType<typeof authReducer>;
	chatMessage: ReturnType<typeof chatMessageReducer>;
};

type ExtraArguments = {
	authApi: typeof authApi;
	chatMessageApi: typeof chatMessageApi;
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
				app: appReducer,
				auth: authReducer,
				chatMessage: chatMessageReducer,
			},
		});
	}

	public get extraArguments(): ExtraArguments {
		return {
			authApi,
			chatMessageApi,
			notification,
			storage,
		};
	}
}

export { Store };
