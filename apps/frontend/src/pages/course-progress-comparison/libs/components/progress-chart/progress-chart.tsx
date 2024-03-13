import { CircularProgress } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	friendProgress: number;
	userProgress: number;
};

const ProgressChart: React.FC<Properties> = ({
	friendProgress,
	userProgress,
}: Properties) => {
	const { friend } = useAppSelector((state) => {
		return {
			friend: state.users.profileUser,
		};
	});

	const friendName = friend ? friend.nickname ?? friend.firstName : "Friend";

	return (
		<div className={styles["container"]}>
			<h3 className={styles["title"]}>Compare Progress</h3>
			<div className={styles["charts"]}>
				<div className={styles["charts-col"]}>
					<span className={styles["chart-title"]}>You</span>
					<CircularProgress percentage={userProgress} />
				</div>
				<div className={styles["charts-col"]}>
					<span className={styles["chart-title"]}>{friendName}</span>
					<CircularProgress percentage={friendProgress} />
				</div>
			</div>

			<div className={styles["tags"]}>
				<div className={styles["tag"]}>
					<span
						className={getValidClassNames(
							styles["tag-circle"],
							styles["tag-completed"],
						)}
					/>
					<span className={styles["tag-name"]}>Completed</span>
				</div>
				<div className={styles["tag"]}>
					<span
						className={getValidClassNames(
							styles["tag-circle"],
							styles["tag-in-process"],
						)}
					/>
					<span className={styles["tag-name"]}>In Progress</span>
				</div>
			</div>
		</div>
	);
};

export { ProgressChart };
