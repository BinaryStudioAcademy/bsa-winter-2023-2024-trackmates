import { BaseStorage } from "./base-storage.package.js";

const storage = new BaseStorage(window.localStorage);

export { storage };
export { StorageKey } from "./libs/enums/enums.js";
export { type Storage } from "./libs/types/types.js";
