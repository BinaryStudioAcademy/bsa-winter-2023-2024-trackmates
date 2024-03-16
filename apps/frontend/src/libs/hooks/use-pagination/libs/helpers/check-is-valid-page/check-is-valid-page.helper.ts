import { PaginationValue } from "~/libs/enums/enums.js";

const checkIsValidPage = (
	pageFromQuery: number,
	pagesCount: number,
): boolean => {
	const isPageInteger = Number.isInteger(pageFromQuery);
	const isPageDefault = pageFromQuery > PaginationValue.DEFAULT_PAGE;
	const isPageExists = pagesCount >= pageFromQuery;

	return isPageExists && isPageDefault && isPageInteger;
};

export { checkIsValidPage };
