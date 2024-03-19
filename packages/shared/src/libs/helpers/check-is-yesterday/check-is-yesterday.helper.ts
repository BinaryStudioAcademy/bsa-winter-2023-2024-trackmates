import { isYesterday } from "date-fns";

const checkIsYesterday = (date: Date | number | string): boolean => {
	return isYesterday(date);
};

export { checkIsYesterday };
