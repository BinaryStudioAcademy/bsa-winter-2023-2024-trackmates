import { type Config as LibraryConfig } from "shared/build/index.js";

import { EnvironmentSchema } from "./types.js";

type Config = LibraryConfig<EnvironmentSchema>;

export { type Config };
