import logo from "~/assets/img/svg/auth-circle-logo.svg";
import { AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type ValueOf } from "~/libs/types/types.js";

import { Button, Icon, Image, Link } from "../components.js";
import { type IconName } from "../icon/icon.js";
import styles from "./styles.module.css";

type Properties = {
	className?: string | undefined;
};

const MENU_ITEMS: {
	href: ValueOf<typeof AppRoute>;
	icon: IconName;
	label: string;
}[] = [
	{
		href: "/overview",
		icon: "home",
		label: "Overview",
	},
];

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
						key={label}
						label={
							<span className={styles["menu-item-content"]}>
								<Icon className={styles["menu-item-icon"]} name={icon} />
								{label}
							</span>
						}
					/>
				))}
			</nav>
		</div>
	);
};

export { Sidebar };
