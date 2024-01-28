import { BaseStorage } from "./base-storage.module.ts";

const storage = new BaseStorage(window.localStorage);

export { storage };
export { StorageKey } from "./libs/enums/enums.ts";
export { type Storage } from "./libs/types/types.ts";
