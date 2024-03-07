import { PaginationValue } from "~/libs/enums/enums.js";

const getPagesValid = ({
	pageFromUrl,
	searchParameters,
}: {
	pageFromUrl: number;
	searchParameters: URLSearchParams;
}): boolean => {
	const hasPageParameter = searchParameters.has("page");
	const isValidNumber = pageFromUrl > PaginationValue.DEFAULT_PAGE;

	return hasPageParameter && isValidNumber;
};

export { getPagesValid };
