import { DateValue, FormatDateType } from "~/libs/enums/enums.js";
import {
	getFormattedDate,
	isThisYear,
	isToday,
	isYesterday,
} from "~/libs/helpers/helpers.js";

const getFormattedChatDate = (dateString: string): string => {
	const date = new Date(dateString);

	if (isToday(date)) {
		return DateValue.TODAY;
	} else if (isYesterday(date)) {
		return DateValue.YESTERDAY;
	} else if (isThisYear(date)) {
		return getFormattedDate(dateString, FormatDateType.MMMM_DO).toLowerCase();
	} else {
		return getFormattedDate(
			dateString,
			FormatDateType.MMMM_DO_YYYY,
		).toLowerCase();
	}
};

export { getFormattedChatDate };
