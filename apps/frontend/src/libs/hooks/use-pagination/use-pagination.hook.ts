import { PaginationValue } from "~/libs/enums/enums.js";
import { useEffect, useSearchParams, useState } from "~/libs/hooks/hooks.js";

import {
	checkIsValidPage,
	getPagesCut,
	getPagesRange,
} from "./libs/helpers/helpers.js";

type UsePagination = (options: {
	pageSize: number;
	pagesCutCount: number;
	path?: string;
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
	path,
	queryName = "page",
	totalCount,
}) => {
	const [searchParameters, setSearchParameters] = useSearchParams();
	const pageFromQuery = Number(searchParameters.get(queryName));
	const [page, setPage] = useState<number>(PaginationValue.DEFAULT_PAGE);
	const currentPath = path || location.pathname;

	const pagesCount = Math.ceil(totalCount / pageSize);
	const pagesCut = getPagesCut({
		currentPage: page,
		pagesCount,
		pagesCutCount,
	});
	const pages = getPagesRange(pagesCut.start, pagesCut.end);

	useEffect(() => {
		const isSamePath = currentPath === location.pathname;
		const isValidPage = checkIsValidPage(pageFromQuery, pagesCount);
		const isInvalidPage = pagesCount !== PaginationValue.PAGE_NOT_EXISTS;

		if (!isSamePath) {
			setPage(PaginationValue.DEFAULT_PAGE);

			return;
		}

		if (isValidPage) {
			setPage(pageFromQuery);
		} else if (isInvalidPage) {
			setPage(PaginationValue.DEFAULT_PAGE);
			const url = new URL(window.location.origin + window.location.pathname);
			window.history.replaceState(null, "", url.toString());
		}
	}, [pageFromQuery, pagesCount, location.pathname]);

	const handlePageChange = (page: number): void => {
		const updatedSearchParameters = new URLSearchParams(
			searchParameters.toString(),
		);
		updatedSearchParameters.set(queryName, String(page));
		setSearchParameters(updatedSearchParameters);
		setPage(page);
	};

	return { handlePageChange, page, pages, pagesCount };
};

export { usePagination };
