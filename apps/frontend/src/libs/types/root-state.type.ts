import { type store } from "~/libs/modules/store/store.js";

type RootState = ReturnType<typeof store.instance.getState>;

export { type RootState };
