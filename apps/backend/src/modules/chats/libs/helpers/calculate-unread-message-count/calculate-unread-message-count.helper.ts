import { EMPTY_ARRAY_LENGTH } from "~/libs/constants/constants.js";

const calculateUnreadMessageCount = (counts: number[]): number => {
	return counts.reduce((total, count) => {
		return total + count;
	}, EMPTY_ARRAY_LENGTH);
};

export { calculateUnreadMessageCount };
