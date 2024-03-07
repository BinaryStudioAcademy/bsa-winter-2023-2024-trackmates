import { type AsyncThunk } from "@reduxjs/toolkit";

import { Pagination } from "~/libs/components/components.js";
import { PaginationValue } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	usePagination,
} from "~/libs/hooks/hooks.js";
import {
	type AsyncThunkConfig,
	type PaginationRequestDto,
	type PaginationResponseDto,
} from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { FriendList } from "./libs/components/components.js";

const PAGINATION_PAGES_CUT_COUNT = 5;
const NO_ITEMS_COUNT = 0;

type LoadAction = AsyncThunk<
	PaginationResponseDto<UserAuthResponseDto>,
	PaginationRequestDto,
	AsyncThunkConfig
>;

type Properties = {
	action: LoadAction;
	itemsKey: "followers" | "followings" | "potentialFriends";
	totalKey:
		| "followersTotalCount"
		| "followingsTotalCount"
		| "potentialFriendsTotalCount";
};

const FriendsTab: React.FC<Properties> = ({
	action,
	itemsKey,
	totalKey,
}: Properties) => {
	const { items, total } = useAppSelector((state) => {
		return {
			items: state.friends[itemsKey],
			total: state.friends[totalKey],
		};
	});

	const dispatch = useAppDispatch();

	const { handlePageChange, page, pages, pagesCount } = usePagination({
		pageSize: PaginationValue.DEFAULT_COUNT,
		pagesCutCount: PAGINATION_PAGES_CUT_COUNT,
		totalCount: total,
	});

	useEffect(() => {
		void dispatch(
			action({
				count: PaginationValue.DEFAULT_COUNT,
				page,
			}),
		);
	}, [dispatch, action, itemsKey, totalKey, page]);

	const hasPages = items.length > NO_ITEMS_COUNT;

	return (
		<>
			<FriendList friends={items} />
			{hasPages && (
				<Pagination
					currentPage={page}
					onPageChange={handlePageChange}
					pages={pages}
					pagesCount={pagesCount}
				/>
			)}
		</>
	);
};

export { FriendsTab };
