import { Loader } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
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
	const [isLoadingComments, setIsLoadingComments] = useState<boolean>(false);
	const [isLoadingCreateComment, setIsLoadingCreateComment] =
		useState<boolean>(false);

	const handleCreateComment = useCallback(
		(payload: Pick<CommentCreateRequestDto, "text">): void => {
			setIsLoadingCreateComment(true);
			void dispatch(
				activityActions.createComment({
					activityId,
					text: payload.text,
				}),
			)
				.unwrap()
				.then((comment) => {
					setComments([comment, ...comments]);
					setIsLoadingCreateComment(false);
				});
		},
		[activityId, comments, dispatch],
	);

	useEffect(() => {
		setIsLoadingComments(true);
		void dispatch(activityActions.getAllCommentsToActivity(activityId))
			.unwrap()
			.then((response) => {
				setComments(response.items);
				setIsLoadingComments(false);
			});
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
				isLoading={isLoadingCreateComment}
				onSubmit={handleCreateComment}
			/>
		</div>
	);
};

export { ActivityComments };
