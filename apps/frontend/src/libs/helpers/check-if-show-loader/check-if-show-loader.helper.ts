import { DataStatus } from "~/libs/enums/enums.js";
import { ValueOf } from "~/libs/types/value-of.type.js";

const checkIfShowLoader = (dataStatus: ValueOf<typeof DataStatus>) => {
	return dataStatus === DataStatus.IDLE || dataStatus === DataStatus.PENDING;
};

export { checkIfShowLoader };
