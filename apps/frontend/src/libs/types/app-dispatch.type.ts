import { type store } from "~/libs/modules/store/store.js";

type AppDispatch = typeof store.instance.dispatch;

export { type AppDispatch };
