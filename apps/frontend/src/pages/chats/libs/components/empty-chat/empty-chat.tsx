import chatImage from "~/assets/img/chat-img.png";
import { Image, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";

import styles from "./styles.module.css";

const EmptyChat: React.FC = () => {
	return (
		<div className={styles["container"]}>
			<p className={styles["subtitle"]}>
				Go to chat or{" "}
				<Link className={styles["link"]} to={AppRoute.FRIENDS}>
					create new one.
				</Link>
			</p>
			<Image alt="chat image" className={styles["image"]} src={chatImage} />
		</div>
	);
};

export { EmptyChat };
