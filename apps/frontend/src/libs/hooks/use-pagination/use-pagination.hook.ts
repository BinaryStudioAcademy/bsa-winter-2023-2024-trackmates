import { PaginationValue } from "~/libs/enums/enums.js";
import {
	useEffect,
	useLocation,
	useNavigate,
	useState,
} from "~/libs/hooks/hooks.js";

import {
	getPagesCut,
	getPagesRange,
	getPagesValid,
} from "./libs/helpers/helpers.js";

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
	const location = useLocation();
	const history = useNavigate();
	const pagesCount = Math.ceil(totalCount / pageSize);
	const pagesCut = getPagesCut({
		currentPage: page,
		pagesCount,
		pagesCutCount,
	});
	const pages = getPagesRange(pagesCut.start, pagesCut.end);

	useEffect(() => {
		const searchParameters = new URLSearchParams(location.search);
		const pageFromUrl = Number(searchParameters.get("page"));
		const isValidPage = getPagesValid({ pageFromUrl, searchParameters });

		if (pageFromUrl <= pagesCount && isValidPage) {
			setPage(pageFromUrl);
		} else if (pagesCount !== PaginationValue.PAGE_NOT_EXISTS) {
			history("", { replace: true });
			setPage(PaginationValue.DEFAULT_PAGE);
		}
	}, [location.search, page, pagesCount]);

	const handlePageChange = (page: number): void => {
		setPage(page);

		history(`?page=${page}`, { replace: true });
	};

	return { handlePageChange, page, pages, pagesCount };
};

export { usePagination };
