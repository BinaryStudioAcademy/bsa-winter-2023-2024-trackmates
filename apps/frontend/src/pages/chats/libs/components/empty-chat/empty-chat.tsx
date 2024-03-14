import chatImage from "~/assets/img/chat-character.svg";
import { Image, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	className?: string | undefined;
};

const EmptyChat: React.FC<Properties> = ({ className }: Properties) => {
	const chatsStyles = getValidClassNames(styles["container"], className);

	return (
		<div className={chatsStyles}>
			<div className={styles["navigation"]} />
			<div className={styles["content-container"]}>
				<p className={styles["subtitle"]}>
					Go to chat or{" "}
					<Link className={styles["link"]} to={AppRoute.FRIENDS}>
						create new one.
					</Link>
				</p>
				<Image alt="chat image" className={styles["image"]} src={chatImage} />
			</div>
		</div>
	);
};

export { EmptyChat };
