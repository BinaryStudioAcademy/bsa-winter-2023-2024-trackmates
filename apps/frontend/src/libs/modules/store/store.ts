import { config } from "~/libs/modules/config/config.ts";

import { Store } from "./store.module.ts";

const store = new Store(config);

export { store };
