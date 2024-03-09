import { Loader } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import { actions as activityActions } from "~/modules/activities/activities.js";
import {
	type CommentCreateRequestDto,
	type CommentWithRelationsResponseDto,
} from "~/modules/comments/comments.js";

import { ActivityCommentForm } from "../activity-comment-form/activity-comment-form.js";
import { CommentCard } from "../comment-card/comment-card.js";
import styles from "./styles.module.css";

type Properties = {
	activityId: number;
};

const ActivityComments: React.FC<Properties> = ({ activityId }: Properties) => {
	const dispatch = useAppDispatch();
	const [comments, setComments] = useState<CommentWithRelationsResponseDto[]>(
		[],
	);
	const [loadCommentsDataStatus, setLoadCommentsDataStatus] = useState<
		ValueOf<typeof DataStatus>
	>(DataStatus.IDLE);
	const [createCommentDataStatus, setCreateCommentDataStatus] = useState<
		ValueOf<typeof DataStatus>
	>(DataStatus.IDLE);

	const handleCreateComment = useCallback(
		(payload: Pick<CommentCreateRequestDto, "text">): void => {
			setCreateCommentDataStatus(DataStatus.PENDING);
			void dispatch(
				activityActions.createComment({
					activityId,
					text: payload.text,
				}),
			)
				.unwrap()
				.then((comment) => {
					setComments([comment, ...comments]);
					setCreateCommentDataStatus(DataStatus.FULFILLED);
				});
		},
		[activityId, comments, dispatch],
	);

	useEffect(() => {
		setLoadCommentsDataStatus(DataStatus.PENDING);
		void dispatch(activityActions.getAllCommentsToActivity(activityId))
			.unwrap()
			.then((response) => {
				setComments(response.items);
				setLoadCommentsDataStatus(DataStatus.FULFILLED);
			});
	}, [activityId, dispatch]);

	const isLoadingComments = loadCommentsDataStatus === DataStatus.PENDING;
	const isCreatingComment = createCommentDataStatus === DataStatus.PENDING;

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
				isLoading={isCreatingComment}
				onSubmit={handleCreateComment}
			/>
		</div>
	);
};

export { ActivityComments };
