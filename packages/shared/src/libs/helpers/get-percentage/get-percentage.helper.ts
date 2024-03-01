const EMPTY_TOTAL = 0;
const MAX_PERCENT = 100;

function getPercentage({
	part,
	total,
}: {
	part: number;
	total: number;
}): number {
	if (total === EMPTY_TOTAL) {
		return EMPTY_TOTAL;
	}

	return (part / total) * MAX_PERCENT;
}

export { getPercentage };
