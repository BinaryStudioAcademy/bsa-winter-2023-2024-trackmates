import { ValueOf } from "~/libs/types/types.js";

import { IconNames } from "../enums/enums.js";

type IconName = ValueOf<typeof IconNames>;

export { type IconName };
