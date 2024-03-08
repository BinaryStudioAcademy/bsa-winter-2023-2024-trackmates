import { PaginationValue } from "~/libs/enums/enums.js";
import { useEffect, useSearchParams, useState } from "~/libs/hooks/hooks.js";

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

const QUERY_SECTION_SIZE = 1;

const usePagination: UsePagination = ({
	pageSize,
	pagesCutCount,
	totalCount,
}) => {
	const queryName = "page";
	const [searchParameters, setSearchParameters] = useSearchParams();
	const pageFromQuery = Number(searchParameters.get(queryName));
	const queryParameters = new URLSearchParams(location.search);
	const validPage =
		pageFromQuery > PaginationValue.PAGE_NOT_EXISTS
			? pageFromQuery
			: PaginationValue.DEFAULT_PAGE;
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
		const updatedSearchParameters = new URLSearchParams(
			searchParameters.toString(),
		);

		if (path !== location.pathname) {
			setPath(location.pathname);
			setPage(PaginationValue.DEFAULT_COUNT);

			return;
		}

		if (pagesCount >= pageFromQuery) {
			updatedSearchParameters.set(queryName, String(page));
			setSearchParameters(updatedSearchParameters);
		} else if (
			pagesCount !== PaginationValue.PAGE_NOT_EXISTS ||
			queryParameters.size > QUERY_SECTION_SIZE
		) {
			setPage(PaginationValue.DEFAULT_COUNT);
			updatedSearchParameters.set(
				queryName,
				String(PaginationValue.DEFAULT_COUNT),
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
