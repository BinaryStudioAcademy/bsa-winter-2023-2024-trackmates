import logo from "~/assets/img/sidebar-logo.svg";
import {
	checkIfUserHasPermissions,
	getValidClassNames,
} from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useCallback,
	useState,
	useToggleScroll,
} from "~/libs/hooks/hooks.js";
import { type MenuItem, type PagePermissions } from "~/libs/types/types.js";
import {
	type UserAuthResponseDto,
	actions as authActions,
} from "~/modules/auth/auth.js";
import { actions as userCoursesActions } from "~/modules/user-courses/user-courses.js";

import { BlurredBackground } from "../blurred-background/blurred-background.js";
import { Button } from "../button/button.js";
import { Icon } from "../icon/icon.js";
import { Image } from "../image/image.js";
import { Link } from "../link/link.js";
import styles from "./styles.module.css";

type Properties = {
	menuItems: MenuItem[];
	user: UserAuthResponseDto;
};

const Sidebar: React.FC<Properties> = ({ menuItems, user }: Properties) => {
	const dispatch = useAppDispatch();
	const [isOpen, setOpen] = useState<boolean>(false);

	const handleToggleSidebar = useCallback(() => {
		setOpen((isOpen) => !isOpen);
	}, []);

	const handleLogOut = useCallback(() => {
		void dispatch(authActions.logOut())
			.unwrap()
			.then(() => {
				dispatch(userCoursesActions.reset());
			});
	}, [dispatch]);

	const handleCheckPermissions = useCallback(
		(pagePermissions: PagePermissions | undefined): boolean => {
			return (
				!pagePermissions ||
				checkIfUserHasPermissions(
					user,
					pagePermissions.permissions,
					pagePermissions.mode,
				)
			);
		},
		[user],
	);

	useToggleScroll(isOpen);

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
				<div className={styles["content-wrapper"]}>
					<div className={styles["content-container"]}>
						<Link className={styles["title-container"]} to="/">
							<Image alt="website logo" className={styles["logo"]} src={logo} />
						</Link>
						<nav className={styles["menu"]}>
							{menuItems.map(({ href, icon, label, pagePermissions }) => {
								return (
									handleCheckPermissions(pagePermissions) && (
										<Link
											activeClassName={styles["active"]}
											className={getValidClassNames(
												styles["bottom-menu"],
												styles["menu-item"],
											)}
											key={label}
											to={href}
										>
											<Icon className={styles["link-icon"]} name={icon} />
											<span className={styles["link-title"]}>{label}</span>
										</Link>
									)
								);
							})}
						</nav>
					</div>
					<Button
						className={styles["log-out-btn"]}
						iconName="logOut"
						label="Log Out"
						onClick={handleLogOut}
						style="plain"
					/>
				</div>
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
