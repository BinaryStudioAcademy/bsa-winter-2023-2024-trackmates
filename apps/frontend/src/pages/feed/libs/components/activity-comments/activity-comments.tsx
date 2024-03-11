import { Loader } from "~/libs/components/components.js";
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

	useEffect(() => {
		void dispatch(activityActions.getAllCommentsToActivity(activityId));
	}, [activityId, dispatch]);

	return (
		<div className={styles["container"]}>
			{isLoadingComments ? (
				<Loader color="orange" size="large" />
			) : (
				<div className={styles["comments-container"]}>
					{comments.map((comment) => (
						<CommentCard comment={comment} key={comment.id} />
					))}
				</div>
			)}
			<ActivityCommentForm
				isLoading={isLoadingComments}
				onSubmit={handleCreateComment}
			/>
		</div>
	);
};

export { ActivityComments };
