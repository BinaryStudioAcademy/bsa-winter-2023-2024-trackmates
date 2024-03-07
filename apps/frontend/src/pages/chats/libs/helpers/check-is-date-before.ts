import { isBefore, startOfDay } from "date-fns";

const checkIsDateBefore = (firstDate: string, secondDate: string): boolean => {
	return isBefore(
		startOfDay(new Date(firstDate)),
		startOfDay(new Date(secondDate)),
	);
};

export { checkIsDateBefore };
