import { Link, Navigate } from "~/libs/components/components.js";
import { AppRoute, AppTitle } from "~/libs/enums/enums.js";
import {
	checkIfUserHasPermissions,
	getValidClassNames,
} from "~/libs/helpers/helpers.js";
import {
	useAppSelector,
	useAppTitle,
	useLocation,
	useMemo,
} from "~/libs/hooks/hooks.js";
import { type UserAuthResponseDto } from "~/modules/auth/auth.js";

import { GroupsTab, UsersTab } from "./libs/components/components.js";
import { LINKS } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const Management: React.FC = () => {
	useAppTitle(AppTitle.MANAGEMENT);
	const { pathname } = useLocation();
	const { user } = useAppSelector((state) => {
		return {
			user: state.auth.user as UserAuthResponseDto,
		};
	});

	const hasAccessToTabs = useMemo(() => {
		const map = new Map<number, boolean>();

		for (const [index, link] of LINKS.entries()) {
			map.set(
				index,
				checkIfUserHasPermissions(
					user,
					link.permissions.key,
					link.permissions.mode,
				),
			);
		}

		return map;
	}, [user]);

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
		<div className={styles["wrapper"]}>
			<span className={styles["title"]}>Management</span>
			<ul className={styles["link-list"]}>
				{LINKS.map((link, index) => {
					const hasAccess = hasAccessToTabs.get(index);

					return (
						<li
							className={getValidClassNames(
								styles["link-item"],
								link.to === pathname && styles["active"],
							)}
							key={index}
						>
							<Link
								className={getValidClassNames(
									styles["link"],
									!hasAccess && styles["disabled"],
								)}
								to={link.to}
							>
								{link.title}
							</Link>
						</li>
					);
				})}
			</ul>
			{handleScreenRender(pathname)}
		</div>
	);
};

export { Management };
