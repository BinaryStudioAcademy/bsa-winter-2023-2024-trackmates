import {
	getFormattedDate,
	isThisYear,
	isToday,
	isYesterday,
} from "~/libs/helpers/helpers.js";

const getFormattedChatDate = (dateString: string): string => {
	const date = new Date(dateString);

	if (isToday(date)) {
		return "today";
	} else if (isYesterday(date)) {
		return "yesterday";
	} else if (isThisYear(date)) {
		return getFormattedDate(dateString, "MMMM do").toLowerCase();
	} else {
		return getFormattedDate(dateString, "MMMM do, yyyy").toLowerCase();
	}
};

export { getFormattedChatDate };
