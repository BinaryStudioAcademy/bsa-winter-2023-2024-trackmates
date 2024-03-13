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
	}

	if (checkIsYesterday(date)) {
		return DateValue.YESTERDAY;
	}

	if (checkIsThisYear(date)) {
		return getFormattedDate(dateString, FormatDateType.MMMM_DO);
	}

	return getFormattedDate(dateString, FormatDateType.MMMM_DO_YYYY);
};

export { getFormattedChatDate };
