const TimeInMillisecond = {
	DAY: 86_400_000,
	HOUR: 3_600_000,
	MINUTE: 60_000,
	TWO_DAYS: 172_800_000,
} as const;

const firstDateCharacterIndex = 0;
const dateCharactersAmount = 10;

const getTimeAgo = (dateString: string): string => {
	const date = new Date(dateString);
	const now = new Date();
	const diff = Number(now) - Number(date);

	if (diff < TimeInMillisecond.MINUTE) {
		return "just now";
	} else if (diff < TimeInMillisecond.HOUR) {
		return `${Math.floor(diff / TimeInMillisecond.MINUTE)} minute(s) ago`;
	} else if (diff < TimeInMillisecond.DAY) {
		return `${Math.floor(diff / TimeInMillisecond.HOUR)} hour(s) ago`;
	} else if (diff < TimeInMillisecond.TWO_DAYS) {
		return "yesterday";
	} else {
		return date
			.toISOString()
			.slice(firstDateCharacterIndex, dateCharactersAmount);
	}
};

export { getTimeAgo };
