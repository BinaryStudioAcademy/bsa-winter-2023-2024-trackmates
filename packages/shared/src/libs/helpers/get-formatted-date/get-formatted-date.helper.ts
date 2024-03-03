import { format } from "date-fns";

import { type FormatDateType } from "../../enums/enums.js";
import { type ValueOf } from "../../types/types.js";

const getFormattedDate = (
	date: string,
	formatType: ValueOf<typeof FormatDateType>,
): string => {
	const inputDate = new Date(date);

	return format(inputDate, formatType);
};

export { getFormattedDate };
