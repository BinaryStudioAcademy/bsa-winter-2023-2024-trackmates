import { PaginationValue } from "~/libs/enums/enums.js";
import { useState } from "~/libs/hooks/hooks.js";

import { getPagesCut, getPagesRange } from "./libs/helpers/helpers.js";

type UsePagination = (options: {
	pageSize: number;
	pagesCutCount: number;
	totalCount: number;
}) => {
	handlePageChange: (page: number) => void;
	page: number;
	pages: number[];
	pagesCount: number;
};

const usePagination: UsePagination = ({
	pageSize,
	pagesCutCount,
	totalCount,
}) => {
	const [page, setPage] = useState<number>(PaginationValue.DEFAULT_PAGE);

	const pagesCount = Math.ceil(totalCount / pageSize);
	const pagesCut = getPagesCut({
		currentPage: page,
		pagesCount,
		pagesCutCount,
	});
	const pages = getPagesRange(pagesCut.start, pagesCut.end);

	const handlePageChange = (page: number): void => {
		setPage(page);
	};

	return { handlePageChange, page, pages, pagesCount };
};

export { usePagination };
