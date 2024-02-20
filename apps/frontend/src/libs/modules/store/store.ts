import { config } from "~/libs/modules/config/config.js";

import { Store } from "./store.module.js";

const store = new Store(config);
type RootState = ReturnType<typeof store.instance.getState>;

export { type RootState, store };
