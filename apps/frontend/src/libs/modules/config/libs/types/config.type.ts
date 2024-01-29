import { type Config as LibraryConfig } from "shared";

import { EnvironmentSchema } from "./types.ts";

type Config = LibraryConfig<EnvironmentSchema>;

export { type Config };
