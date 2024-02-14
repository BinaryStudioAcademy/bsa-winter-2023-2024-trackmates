import { IconNames } from "~/libs/enums/enums.js";
import { ValueOf } from "~/libs/types/types.js";

type IconName = ValueOf<typeof IconNames>;

export { type IconName };
