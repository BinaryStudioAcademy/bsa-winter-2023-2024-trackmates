import { format } from "date-fns";

const getFormattedDate = (date: string, formatType: string): string => {
	const inputDate = new Date(date);

	return format(inputDate, formatType);
};

export { getFormattedDate };
