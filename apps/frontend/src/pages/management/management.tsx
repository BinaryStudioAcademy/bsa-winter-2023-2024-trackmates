import { Link, Navigate } from "~/libs/components/components.js";
import { AppRoute, AppTitle } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useAppTitle, useLocation } from "~/libs/hooks/hooks.js";

import { GroupsTab, UsersTab } from "./libs/components/components.js";
import { LINKS } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const Management: React.FC = () => {
	useAppTitle(AppTitle.MANAGEMENT);
	const { pathname } = useLocation();

	const handleScreenRender = (screen: string): React.ReactNode => {
		switch (screen) {
			case AppRoute.MANAGEMENT: {
				return <Navigate replace to={AppRoute.MANAGEMENT_USERS} />;
			}

			case AppRoute.MANAGEMENT_USERS: {
				return <UsersTab />;
			}

			case AppRoute.MANAGEMENT_GROUPS: {
				return <GroupsTab />;
			}

			default: {
				return null;
			}
		}
	};

	return (
		<div className={styles["container"]}>
			<span className={styles["title"]}>Management</span>
			<ul className={styles["link-list"]}>
				{LINKS.map((link, index) => (
					<li
						className={getValidClassNames(
							styles["link-item"],
							link.to === pathname && styles["active"],
						)}
						key={index}
					>
						<Link className={styles["link"]} to={link.to}>
							{link.title}
						</Link>
					</li>
				))}
			</ul>
			{handleScreenRender(pathname)}
		</div>
	);
};

export { Management };
