import { type store } from "~/libs/modules/store/store.js";

import { type AppDispatch } from "./app-dispatch.type.js";

type AsyncThunkConfig = {
	dispatch: AppDispatch;
	extra: typeof store.extraArguments;
	state: ReturnType<typeof store.instance.getState>;
};

export { type AsyncThunkConfig };
