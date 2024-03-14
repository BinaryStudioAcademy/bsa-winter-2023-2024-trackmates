import { PaginationValue } from "~/libs/enums/enums.js";
import { useEffect, useSearchParams, useState } from "~/libs/hooks/hooks.js";

import { getPagesCut, getPagesRange } from "./libs/helpers/helpers.js";

type UsePagination = (options: {
	pageSize: number;
	pagesCutCount: number;
	queryName?: string;
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
	queryName = "page",
	totalCount,
}) => {
	const [searchParameters, setSearchParameters] = useSearchParams();
	const pageFromQuery = Number(searchParameters.get(queryName));
	const isPageInteger = Number.isInteger(pageFromQuery);
	const isPageValid =
		isPageInteger && pageFromQuery > PaginationValue.PAGE_NOT_EXISTS;
	const validPage = isPageValid ? pageFromQuery : PaginationValue.DEFAULT_PAGE;
	const [page, setPage] = useState<number>(validPage);
	const [path, setPath] = useState<string>(location.pathname);
	const pagesCount = Math.ceil(totalCount / pageSize);
	const pagesCut = getPagesCut({
		currentPage: page,
		pagesCount,
		pagesCutCount,
	});
	const pages = getPagesRange(pagesCut.start, pagesCut.end);

	useEffect(() => {
		const isValidPage = pagesCount >= pageFromQuery;
		const isInvalidPage = pagesCount !== PaginationValue.PAGE_NOT_EXISTS;
		const updatedSearchParameters = new URLSearchParams(
			searchParameters.toString(),
		);

		if (path !== location.pathname) {
			setPath(location.pathname);
			setPage(PaginationValue.DEFAULT_PAGE);

			return;
		}

		if (isValidPage) {
			updatedSearchParameters.set(queryName, String(page));
			setSearchParameters(updatedSearchParameters);
		} else if (isInvalidPage) {
			setPage(PaginationValue.DEFAULT_PAGE);
			updatedSearchParameters.set(
				queryName,
				String(PaginationValue.DEFAULT_PAGE),
			);
			setSearchParameters(updatedSearchParameters);
		}
	}, [page, pagesCount, location.pathname]);

	const handlePageChange = (page: number): void => {
		setPage(page);
	};

	return { handlePageChange, page, pages, pagesCount };
};

export { usePagination };
