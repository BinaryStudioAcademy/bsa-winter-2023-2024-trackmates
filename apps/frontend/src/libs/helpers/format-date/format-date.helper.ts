import { DATA_FORMAT_VALUES } from "~/libs/constants/constants.js";

const formatDate = (inputDate: string): string => {
	const inputDateTime = new Date(inputDate);
	const timeDifference = Date.now() - inputDateTime.getTime();
	const hoursDifference =
		timeDifference /
		(DATA_FORMAT_VALUES.MILLISECONDS_IN_SECOND *
			DATA_FORMAT_VALUES.SECONDS_IN_MINUTE *
			DATA_FORMAT_VALUES.MINUTES_IN_HOUR);

	return hoursDifference < DATA_FORMAT_VALUES.HOURS_IN_DAY
		? inputDateTime.toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
			})
		: inputDateTime.toLocaleDateString("en-GB", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
};

export { formatDate };
