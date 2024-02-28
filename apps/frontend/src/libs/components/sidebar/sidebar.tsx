import logo from "~/assets/img/website-logo.png";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useAppDispatch, useCallback, useState } from "~/libs/hooks/hooks.js";
import { type MenuItem } from "~/libs/types/types.js";
import { actions as authActions } from "~/modules/auth/auth.js";

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
	const dispatch = useAppDispatch();
	const [isOpen, setOpen] = useState<boolean>(false);

	const handleToggleSidebar = useCallback(() => {
		setOpen((isOpen) => !isOpen);
	}, []);

	const handleLogOut = useCallback(() => {
		void dispatch(authActions.logOut());
	}, [dispatch]);

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
				style="secondary"
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
						<Link
							activeClassName={styles["active"]}
							className={getValidClassNames(
								styles["bottom-menu"],
								styles["menu-item"],
							)}
							key={label}
							to={href}
						>
							<Icon name={icon} />
							<span className={styles["link-title"]}>{label}</span>
						</Link>
					))}
				</nav>
				<Button
					className={styles["log-out-btn"]}
					iconName="logOut"
					label="Log Out"
					onClick={handleLogOut}
					style="plain"
				/>
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
