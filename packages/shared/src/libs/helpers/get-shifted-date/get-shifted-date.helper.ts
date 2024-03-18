import { addMonths } from "date-fns";

const getShiftedDate = (
	baseDate: string,
	{ month }: { month?: number },
): string => {
	let date = new Date(baseDate);

	if (month) {
		date = addMonths(date, month);
	}

	return date.toISOString();
};

export { getShiftedDate };
