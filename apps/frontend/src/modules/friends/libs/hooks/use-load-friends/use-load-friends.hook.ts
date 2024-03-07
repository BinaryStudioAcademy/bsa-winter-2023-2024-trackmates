import { type AsyncThunk } from "@reduxjs/toolkit";

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

const PAGINATION_PAGES_CUT_COUNT = 5;

type LoadAction = AsyncThunk<
	PaginationResponseDto<UserAuthResponseDto>,
	PaginationRequestDto,
	AsyncThunkConfig
>;

type UseLoadFriends = (options: {
	itemsKey: "followers" | "followings" | "potentialFriends";
	loadAction: LoadAction;
	totalKey:
		| "followersTotalCount"
		| "followingsTotalCount"
		| "potentialFriendsTotalCount";
}) => {
	items: UserAuthResponseDto[];
	pagination: ReturnType<typeof usePagination>;
};

const useLoadFriends: UseLoadFriends = ({ itemsKey, loadAction, totalKey }) => {
	const dispatch = useAppDispatch();

	const { items, total } = useAppSelector((state) => {
		return {
			items: state.friends[itemsKey],
			total: state.friends[totalKey],
		};
	});

	const pagination = usePagination({
		pageSize: PaginationValue.DEFAULT_COUNT,
		pagesCutCount: PAGINATION_PAGES_CUT_COUNT,
		totalCount: total,
	});

	useEffect(() => {
		void dispatch(
			loadAction({
				count: PaginationValue.DEFAULT_COUNT,
				page: pagination.page,
			}),
		);
	}, [dispatch, pagination.page]);

	return { items, pagination };
};

export { useLoadFriends };
