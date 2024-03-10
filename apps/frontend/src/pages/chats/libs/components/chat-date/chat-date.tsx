import { getFormattedChatDate } from "~/pages/chats/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	date: string;
};

const ChatDate: React.FC<Properties> = ({ date }: Properties) => {
	return (
		<li className={styles["date-container"]}>
			<div className={styles["date-horizontal-rule"]} />
			<div className={styles["date-badge"]}>
				<p className={styles["date-content"]}>{getFormattedChatDate(date)}</p>
			</div>
		</li>
	);
};

export { ChatDate };
