import logo from "~/assets/img/svg/auth-circle-logo.svg";
import { getValidClassNames } from "~/libs/helpers/helpers.js";

import { Button } from "../button/button.js";
import { Image } from "../image/image.js";
import { Link } from "../link/link.js";
import { MENU_ITEMS } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	className?: string | undefined;
};

const Sidebar: React.FC<Properties> = ({ className }: Properties) => {
	return (
		<div className={getValidClassNames(className, styles["wrapper"])}>
			<Link className={styles["title-container"]} to="/">
				<Image alt="website logo" className={styles["logo"]} src={logo} />
				<h1 className={styles["title"]}>TrackMates</h1>
			</Link>

			<nav className={styles["menu"]}>
				{MENU_ITEMS.map(({ href, icon, label }) => (
					<Button
						className={styles["menu-item"]}
						href={href}
						iconName={icon}
						key={label}
						label={label}
					/>
				))}
			</nav>
		</div>
	);
};

export { Sidebar };
