import { ValueOf } from "shared";

import { DataStatus } from "~/libs/enums/enums.js";

const checkIfShowLoader = (dataStatus: ValueOf<typeof DataStatus>) => {
	return dataStatus === DataStatus.IDLE || dataStatus === DataStatus.PENDING;
};

export { checkIfShowLoader };
