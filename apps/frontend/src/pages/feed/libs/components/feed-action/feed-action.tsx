import friendImage from "~/assets/img/friend.jpeg"; //TODO
import { Image } from "~/libs/components/components.js";
import { FeedActionType } from "~/modules/feed/libs/enums/enums.js";
import { type FeedActionDto } from "~/modules/feed/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	action: FeedActionDto;
};

const getTitle = (action: FeedActionDto): string => {
	const userFullName = `${action.user.firstName} ${action.user.lastName}`;

	switch (action.type) {
		case FeedActionType.FINISH_COURSE: {
			return `Course: ${userFullName} has finished course "${action.course.title}". Congratulate her!`;
		}

		case FeedActionType.FINISH_MODULE: {
			return `Module:  ${userFullName} has finished module "${action.courseSection.title}". Congratulate her!`;
		}
	}

	return "";
};

const FeedAction: React.FC<Properties> = ({ action }: Properties) => {
	return (
		<article className={styles["card"]}>
			<div className={styles["card-content"]}>
				<Image
					alt="User avatar"
					className={styles["card-photo"]}
					src={action.user.avatarUrl || friendImage} //TODO
				/>
				<div className={styles["card-info"]}>
					<p className={styles["card-info-title"]}>{getTitle(action)}</p>
					<p className={styles["card-info-subtitle"]}>
						{action.type === FeedActionType.FINISH_MODULE &&
							action.courseSection.description}
					</p>
				</div>
			</div>
		</article>
	);
};

export { FeedAction };
