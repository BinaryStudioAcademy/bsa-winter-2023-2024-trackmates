import logo from "~/assets/img/website-logo.png";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useLocation, useState } from "~/libs/hooks/hooks.js";
import { type MenuItem } from "~/libs/types/types.js";

import { BlurredBackground } from "../blurred-background/blurred-background.js";
import { Button } from "../button/button.js";
import { Icon } from "../icon/icon.js";
import { Image } from "../image/image.js";
import { Link } from "../link/link.js";
import styles from "./styles.module.css";

type Properties = {
	menuItems: MenuItem[];
};

const Sidebar: React.FC<Properties> = ({ menuItems }: Properties) => {
	const [isOpen, setOpen] = useState<boolean>(false);

	const location = useLocation();

	const handleToggleSidebar = useCallback(() => {
		setOpen((isOpen) => !isOpen);
	}, []);

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
				</Link>
				<nav className={styles["menu"]}>
					{menuItems.map(({ href, icon, label }) => (
						<>
							<Button
								className={styles["menu-item"]}
								href={href}
								iconName={icon}
								key={label}
								label={label}
							/>
							<Link
								className={getValidClassNames(
									styles["bottom-menu"],
									href === location.pathname ? styles["active"] : "",
								)}
								to={href}
							>
								{" "}
								<span className={styles["menu-icon"]}>
									<Icon name={icon} />
								</span>
								<span>{label}</span>
							</Link>
						</>
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
