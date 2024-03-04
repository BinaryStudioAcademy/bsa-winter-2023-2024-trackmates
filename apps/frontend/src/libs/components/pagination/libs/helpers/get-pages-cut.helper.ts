type GetPagesCutParameters = {
	currentPage: number;
	pagesCount: number;
	pagesCutCount: number;
};

type GetPagesCutReturn = {
	end: number;
	start: number;
};

const ONE_ITEM = 1;
const HALF_DIVIDER = 2;

const getPagesCut = ({
	currentPage,
	pagesCount,
	pagesCutCount,
}: GetPagesCutParameters): GetPagesCutReturn => {
	const ceiling = Math.ceil(pagesCutCount / HALF_DIVIDER);
	const floor = Math.floor(pagesCutCount / HALF_DIVIDER);

	if (pagesCount < pagesCutCount) {
		return { end: pagesCount + ONE_ITEM, start: ONE_ITEM };
	} else if (currentPage >= ONE_ITEM && currentPage <= ceiling) {
		return { end: pagesCutCount + ONE_ITEM, start: ONE_ITEM };
	} else if (currentPage + floor >= pagesCount) {
		return {
			end: pagesCount + ONE_ITEM,
			start: pagesCount - pagesCutCount + ONE_ITEM,
		};
	} else {
		return {
			end: currentPage + floor + ONE_ITEM,
			start: currentPage - ceiling + ONE_ITEM,
		};
	}
};

export { getPagesCut };
