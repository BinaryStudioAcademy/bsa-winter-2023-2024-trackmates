import { EmptyPagePlaceholder, Loader } from "~/libs/components/components.js";
import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as activityActions } from "~/modules/activities/activities.js";
import { type CommentCreateRequestDto } from "~/modules/comments/comments.js";

import { ActivityCommentForm } from "../activity-comment-form/activity-comment-form.js";
import { CommentCard } from "../comment-card/comment-card.js";
import styles from "./styles.module.css";

type Properties = {
	activityId: number;
};

const ActivityComments: React.FC<Properties> = ({ activityId }: Properties) => {
	const dispatch = useAppDispatch();
	const { comments, isLoadingComments } = useAppSelector((state) => {
		return {
			comments: state.activities.commentsByActivity[activityId] ?? [],
			isLoadingComments:
				state.activities.commentsDataStatuses[activityId] ===
				DataStatus.PENDING,
		};
	});

	const handleCreateComment = useCallback(
		(payload: Pick<CommentCreateRequestDto, "text">): void => {
			void dispatch(
				activityActions.createComment({
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
				activityActions.deleteComment({
					activityId,
					commentId,
				}),
			);
		},
		[dispatch],
	);

	useEffect(() => {
		void dispatch(activityActions.getAllCommentsToActivity(activityId));
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
							{comments.map((comment) => (
								<CommentCard
									comment={comment}
									key={comment.id}
									onDelete={handleDeleteComment}
								/>
							))}
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
