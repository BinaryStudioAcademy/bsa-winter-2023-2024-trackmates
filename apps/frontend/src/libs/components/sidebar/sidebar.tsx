import logo from "~/assets/img/website-logo.png";
import {
	getFirstPathSegment,
	getValidClassNames,
} from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useCallback,
	useLocation,
	useState,
} from "~/libs/hooks/hooks.js";
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

	const location = useLocation();

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
				color="secondary"
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
						<div key={label}>
							<Button
								className={styles["menu-item"]}
								color={
									href === getFirstPathSegment(location.pathname)
										? "primary"
										: "secondary"
								}
								href={href}
								iconName={icon}
								label={label}
								style={
									href === getFirstPathSegment(location.pathname)
										? "filled"
										: "outlined"
								}
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
						</div>
					))}
				</nav>
				<Button
					className={styles["menu-item"]}
					iconName="logOut"
					label="Log out"
					onClick={handleLogOut}
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
