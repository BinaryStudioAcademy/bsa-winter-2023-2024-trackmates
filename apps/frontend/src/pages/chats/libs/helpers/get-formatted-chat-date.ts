import { DateValue, FormatDateType } from "~/libs/enums/enums.js";
import {
	checkIsThisYear,
	checkIsToday,
	checkIsYesterday,
	getFormattedDate,
} from "~/libs/helpers/helpers.js";

const getFormattedChatDate = (dateString: string): string => {
	const date = new Date(dateString);

	if (checkIsToday(date)) {
		return DateValue.TODAY;
	} else if (checkIsYesterday(date)) {
		return DateValue.YESTERDAY;
	} else if (checkIsThisYear(date)) {
		return getFormattedDate(dateString, FormatDateType.MMMM_DO).toLowerCase();
	} else {
		return getFormattedDate(
			dateString,
			FormatDateType.MMMM_DO_YYYY,
		).toLowerCase();
	}
};

export { getFormattedChatDate };
