import React from "react";

import logo from "~/assets/img/svg/auth-circle-logo.svg";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useState } from "~/libs/hooks/hooks.js";
import { type MenuItem } from "~/libs/types/types.js";

import { BlurredBackground } from "../blurred-background/blurred-background.js";
import { Button } from "../button/button.js";
import { Image } from "../image/image.js";
import { Link } from "../link/link.js";
import styles from "./styles.module.css";

type Properties = {
	menuItems: MenuItem[];
};

const Sidebar: React.FC<Properties> = ({ menuItems }: Properties) => {
	const [isOpen, setOpen] = useState<boolean>(false);

	const handleToggleSidebar = useCallback(() => {
		setOpen(!isOpen);
	}, [isOpen]);

	return (
		<>
			<Button
				className={getValidClassNames(
					styles["burger-button"],
					styles[isOpen ? "open" : "close"],
				)}
				hasVisuallyHiddenLabel
				iconName="burger"
				label="burger-button"
				onClick={handleToggleSidebar}
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
			<BlurredBackground
				className={styles["blurred-background"]}
				isVisible={isOpen}
				onClick={handleToggleSidebar}
			/>
		</>
	);
};

export { Sidebar };
