import { isThisYear } from "date-fns";

const checkIsThisYear = (date: Date | number | string): boolean => {
	return isThisYear(date);
};

export { checkIsThisYear };
