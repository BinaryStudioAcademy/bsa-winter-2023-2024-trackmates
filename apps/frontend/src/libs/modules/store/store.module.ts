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
import { filesApi } from "~/modules/files/files.js";
import {
	chatMessagesApi,
	reducer as chatMessagesReducer,
} from "~/modules/chat-messages/chat-messages.js";
import { chatsApi, reducer as chatsReducer } from "~/modules/chats/chats.js";
import {
	friendsApi,
	reducer as friendsReducer,
} from "~/modules/friends/friends.js";
import { userApi } from "~/modules/users/users.js";

import { storage } from "../storage/storage.js";
import { handleError } from "./middlewares/middlewares.js";

type RootReducer = {
	app: ReturnType<typeof appReducer>;
	auth: ReturnType<typeof authReducer>;
	chatMessages: ReturnType<typeof chatMessagesReducer>;
	chats: ReturnType<typeof chatsReducer>;
	friends: ReturnType<typeof friendsReducer>;
};

type ExtraArguments = {
	authApi: typeof authApi;
	chatMessagesApi: typeof chatMessagesApi;
	chatsApi: typeof chatsApi;
	filesApi: typeof filesApi;
	friendsApi: typeof friendsApi;
	notification: typeof notification;
	storage: typeof storage;
	userApi: typeof userApi;
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
				chatMessages: chatMessagesReducer,
				chats: chatsReducer,
				friends: friendsReducer,
			},
		});
	}

	public get extraArguments(): ExtraArguments {
		return {
			authApi,
			chatMessagesApi,
			chatsApi,
			filesApi,
			friendsApi,
			notification,
			storage,
			userApi,
		};
	}
}

export { Store };
