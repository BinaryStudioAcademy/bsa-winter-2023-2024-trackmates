import { DateValue, FormatDateType } from "../../enums/enums.js";
import { getDifferenceInHours } from "../get-difference-in-hours/get-difference-in-hours.helper.js";
import { getFormattedDate } from "../get-formatted-date/get-formatted-date.helper.js";

const getTimeDistanceFormatDate = (date: string): string => {
	return getDifferenceInHours(date) < DateValue.HOURS_IN_DAY
		? getFormattedDate(date, FormatDateType.HH_MM)
		: getFormattedDate(date, FormatDateType.DD_MM_YYYY);
};

export { getTimeDistanceFormatDate };
