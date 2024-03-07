import { type CommentCreateRequestDto } from "~/modules/comments/comments.js";

const DEFAULT_COMMENT_PAYLOAD: Pick<CommentCreateRequestDto, "text"> = {
	text: "",
};

export { DEFAULT_COMMENT_PAYLOAD };
