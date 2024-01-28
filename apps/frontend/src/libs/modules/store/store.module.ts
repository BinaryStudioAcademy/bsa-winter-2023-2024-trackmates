import {
  type UnknownAction,
  type Tuple,
  type ThunkMiddleware,
} from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

import { AppEnvironment } from "~/libs/enums/enums.ts";
import { type Config } from "~/libs/modules/config/config.ts";
import { authApi } from "~/modules/auth/auth.ts";
import { userApi } from "~/modules/users/users.ts";
import { reducer as authReducer } from "~/slices/auth/auth.ts";
import { reducer as usersReducer } from "~/slices/users/users.ts";

type RootReducer = {
  auth: ReturnType<typeof authReducer>;
  users: ReturnType<typeof usersReducer>;
};

type ExtraArguments = {
  authApi: typeof authApi;
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
      reducer: {
        auth: authReducer,
        users: usersReducer,
      },
      middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
          thunk: {
            extraArgument: this.extraArguments,
          },
        });
      },
    });
  }

  public get extraArguments(): ExtraArguments {
    return {
      authApi,
      userApi,
    };
  }
}

export { Store };
