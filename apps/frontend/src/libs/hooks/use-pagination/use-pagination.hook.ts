import { PaginationValue } from "~/libs/enums/enums.js";
import {
	useEffect,
	useNavigate,
	useSearchParams,
	useState,
} from "~/libs/hooks/hooks.js";

import {
	checkIsPageValid,
	getPagesCut,
	getPagesRange,
} from "./libs/helpers/helpers.js";

type UsePagination = (options: {
	pageSize: number;
	pagesCutCount: number;
	totalCount: number;
}) => {
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
	const navigate = useNavigate();
	const pagesCount = Math.ceil(totalCount / pageSize);
	const pagesCut = getPagesCut({
		currentPage: page,
		pagesCount,
		pagesCutCount,
	});
	const pages = getPagesRange(pagesCut.start, pagesCut.end);
	const [searchParameters] = useSearchParams();

	useEffect(() => {
		const pageFromUrl = Number(searchParameters.get("page"));
		const isValidPage = checkIsPageValid(pageFromUrl);

		if (pageFromUrl <= pagesCount && isValidPage) {
			setPage(pageFromUrl);
		} else if (pagesCount !== PaginationValue.PAGE_NOT_EXISTS) {
			navigate("", { replace: true });
			setPage(PaginationValue.DEFAULT_PAGE);
		}
	}, [searchParameters, page, pagesCount]);

	return { page, pages, pagesCount };
};

export { usePagination };
