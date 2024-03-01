import { differenceInHours } from "date-fns";

const getDifferenceInHours = (date: string): number => {
	const currentDate = new Date();
	const inputDate = new Date(date);

	return differenceInHours(currentDate, inputDate);
};

export { getDifferenceInHours };
