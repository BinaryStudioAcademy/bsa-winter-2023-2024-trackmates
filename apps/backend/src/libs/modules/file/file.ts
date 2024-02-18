import { config } from "../config/config.js";
import { BaseFile } from "./file.module.js";

const file = new BaseFile(config);

export { file };
export { type File } from "./libs/types/types.js";
