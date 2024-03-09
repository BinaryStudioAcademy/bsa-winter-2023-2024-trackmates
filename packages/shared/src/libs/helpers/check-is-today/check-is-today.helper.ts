import { isToday } from "date-fns";

const checkIsToday = (date: Date | number | string): boolean => {
	return isToday(date);
};

export { checkIsToday };
