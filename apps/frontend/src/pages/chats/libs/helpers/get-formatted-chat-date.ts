import { format, isThisYear, isToday, isYesterday } from "date-fns";

const getFormattedChatDate = (dateString: string): string => {
	const date = new Date(dateString);

	if (isToday(date)) {
		return "today";
	} else if (isYesterday(date)) {
		return "yesterday";
	} else if (isThisYear(date)) {
		return format(date, "MMMM do").toLowerCase();
	} else {
		return format(date, "MMMM do, yyyy").toLowerCase();
	}
};

export { getFormattedChatDate };
