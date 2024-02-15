import logo from "~/assets/img/svg/auth-circle-mobile-logo.svg";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type MenuItem } from "~/libs/types/types.js";

import { Button } from "../button/button.js";
import { Image } from "../image/image.js";
import { Link } from "../link/link.js";
import styles from "./styles.module.css";

type Properties = {
	className?: string | undefined;
	menuItems: MenuItem[];
};

const Sidebar: React.FC<Properties> = ({
	className,
	menuItems,
}: Properties) => {
	return (
		<div className={getValidClassNames(className, styles["wrapper"])}>
			<Link className={styles["title-container"]} to="/">
				<Image alt="website logo" className={styles["logo"]} src={logo} />
				<h1 className={styles["title"]}>TrackMates</h1>
			</Link>

			<nav className={styles["menu"]}>
				{menuItems.map(({ href, icon, label }) => (
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
