import { PaginationValue, QueryParameterName } from "~/libs/enums/enums.js";
import { useEffect, useSearchParams, useState } from "~/libs/hooks/hooks.js";

import {
	checkIsValidPage,
	getPagesCut,
	getPagesRange,
} from "./libs/helpers/helpers.js";

type UsePagination = (options: {
	pageSize: number;
	pagesCutCount: number;
	queryName?: string;
	totalCount: number;
}) => {
	page: number;
	pages: number[];
	pagesCount: number;
};

const usePagination: UsePagination = ({
	pageSize,
	pagesCutCount,
	queryName = "page",
	totalCount,
}) => {
	const [searchParameters] = useSearchParams();
	const pageFromQuery = Number(searchParameters.get(queryName));

	const searchQuery = searchParameters.get(QueryParameterName.SEARCH);

	const pagesCount = Math.ceil(totalCount / pageSize);
	const isValidPage = checkIsValidPage(pageFromQuery, pagesCount);

	const [page, setPage] = useState<number>(
		isValidPage ? pageFromQuery : PaginationValue.DEFAULT_PAGE,
	);

	const pagesCut = getPagesCut({
		currentPage: page,
		pagesCount,
		pagesCutCount,
	});
	const pages = getPagesRange(pagesCut.start, pagesCut.end);

	useEffect(() => {
		const isValidPage = checkIsValidPage(pageFromQuery, pagesCount);
		const isInvalidPage = pagesCount !== PaginationValue.PAGE_NOT_EXISTS;

		if (isValidPage) {
			setPage(pageFromQuery);
		} else if (isInvalidPage) {
			setPage(PaginationValue.DEFAULT_PAGE);

			const url = new URL(window.location.origin);
			url.pathname = window.location.pathname;

			if (searchQuery) {
				url.searchParams.set("search", searchQuery);
			}

			window.history.replaceState(null, "", url.toString());
		}
	}, [pageFromQuery, pagesCount, location.pathname]);

	return { page, pages, pagesCount };
};

export { usePagination };
