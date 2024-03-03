import { type ValueOf } from "../../../../libs/types/types.js";
import { type ActivityTypeValue } from "../enums/activity-type-value.enum.js";

type ActivityType = ValueOf<typeof ActivityTypeValue>;

export { type ActivityType };
