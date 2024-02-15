import React from "react";

import logo from "~/assets/img/svg/auth-circle-logo.svg";
import { AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useState } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";

import { BlurredBackground } from "../blurred-background/blurred-background.js";
import { Button } from "../button/button.js";
import { type IconName } from "../icon/icon.js";
import { Icon } from "../icon/icon.js";
import { IconButton } from "../icon-button/icon-button.js";
import { Image } from "../image/image.js";
import { Link } from "../link/link.js";
import styles from "./styles.module.css";

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

const Sidebar: React.FC = () => {
	const [isOpen, setOpen] = useState(false);

	const handleClosingSidebar = useCallback(() => {
		setOpen(false);
	}, []);

	const toggleOpenSidebar = useCallback(() => {
		setOpen(!isOpen);
	}, [isOpen]);

	return (
		<>
			<IconButton
				className={getValidClassNames(
					styles["burger-button"],
					styles[isOpen ? "open" : "close"],
				)}
				iconName="burger"
				onClick={toggleOpenSidebar}
			/>

			<div
				className={getValidClassNames(
					styles["sidebar"],
					styles[isOpen ? "open" : "close"],
				)}
			>
				<Link className={styles["title-container"]} to="/">
					<Image alt="website logo" className={styles["logo"]} src={logo} />
					<h1 className={styles["title"]}>TrackMates</h1>
				</Link>

				<nav className={styles["menu"]}>
					{MENU_ITEMS.map(({ href, icon, label }) => (
						<Button
							className={styles["menu-item"]}
							href={href}
							icon={<Icon name={icon} />}
							key={label}
							label={label}
						/>
					))}
				</nav>
			</div>
			<BlurredBackground
				className={styles["blurred-background"]}
				isVisible={isOpen}
				onClick={handleClosingSidebar}
			/>
		</>
	);
};

export { Sidebar };
