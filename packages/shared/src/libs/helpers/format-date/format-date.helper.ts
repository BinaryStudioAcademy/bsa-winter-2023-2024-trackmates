import { differenceInHours, format } from "date-fns";

import { DateValue } from "../../enums/enums.js";

const formatDate = (inputDateString: string): string => {
	const inputDate = new Date(inputDateString);
	const currentDate = new Date();

	const hoursDifference = differenceInHours(currentDate, inputDate);

	return hoursDifference < DateValue.HOURS_IN_DAY
		? format(inputDate, "hh:mm a")
		: format(inputDate, "dd.MM.yyyy");
};

export { formatDate };
