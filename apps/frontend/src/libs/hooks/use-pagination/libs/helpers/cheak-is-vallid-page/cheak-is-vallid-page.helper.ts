import { PaginationValue } from "~/libs/enums/enums.js";

const checkIsPageValid = (pageFromUrl: number): boolean => {
	return pageFromUrl > PaginationValue.DEFAULT_PAGE;
};

export { checkIsPageValid };
