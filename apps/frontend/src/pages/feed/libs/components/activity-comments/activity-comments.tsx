import { EmptyPagePlaceholder, Loader } from "~/libs/components/components.js";
import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useMemo,
} from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import {
	type ActivityResponseDto,
	type ActivityType,
} from "~/modules/activities/activities.js";
import { actions as commentActions } from "~/modules/comments/comments.js";
import { type CommentCreateRequestDto } from "~/modules/comments/comments.js";

import { ActivityCommentForm } from "../activity-comment-form/activity-comment-form.js";
import { CommentCard } from "../comment-card/comment-card.js";
import styles from "./styles.module.css";

type Properties = {
	activityId: number;
};

const ActivityComments: React.FC<Properties> = ({ activityId }: Properties) => {
	const dispatch = useAppDispatch();
	const { activities, comments, isLoadingComments } = useAppSelector(
		(state) => {
			return {
				activities: state.activities.activities,
				comments: state.comments.commentsByActivity[activityId] ?? [],
				isLoadingComments:
					state.comments.commentsDataStatuses[activityId] ===
					DataStatus.PENDING,
			};
		},
	);

	const usersMap = useMemo(() => {
		const map = new Map<
			number,
			ActivityResponseDto<ValueOf<typeof ActivityType>>
		>();

		for (const activity of activities) {
			map.set(activity.user.id, activity);
		}

		return map;
	}, [activities]);

	const handleCreateComment = useCallback(
		(payload: Pick<CommentCreateRequestDto, "text">): void => {
			void dispatch(
				commentActions.createComment({
					activityId,
					text: payload.text,
				}),
			);
		},
		[activityId, dispatch],
	);

	const handleDeleteComment = useCallback(
		(activityId: number, commentId: number): void => {
			void dispatch(
				commentActions.deleteComment({
					activityId,
					commentId,
				}),
			);
		},
		[dispatch],
	);

	useEffect(() => {
		void dispatch(commentActions.getAllCommentsToActivity(activityId));
	}, [activityId, dispatch]);

	const hasComments = comments.length > EMPTY_LENGTH;

	return (
		<div className={styles["container"]}>
			<ActivityCommentForm
				isLoading={isLoadingComments}
				onSubmit={handleCreateComment}
			/>
			{isLoadingComments ? (
				<Loader className={styles["loader"]} color="orange" size="small" />
			) : (
				<>
					{hasComments ? (
						<div className={styles["comments-container"]}>
							{comments.map((comment) => {
								const commentAuthor = usersMap.get(comment.userId);

								const hasSubscription = Boolean(
									commentAuthor?.user.subscription,
								);

								return (
									<CommentCard
										comment={comment}
										hasSubscription={hasSubscription}
										key={comment.id}
										onDelete={handleDeleteComment}
									/>
								);
							})}
						</div>
					) : (
						<EmptyPagePlaceholder
							size="small"
							title="There are no comments yet"
						/>
					)}
				</>
			)}
		</div>
	);
};

export { ActivityComments };
