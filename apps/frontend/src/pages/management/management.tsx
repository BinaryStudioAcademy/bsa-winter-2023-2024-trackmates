import { Button, Link, Navigate } from "~/libs/components/components.js";
import { AppRoute, AppTitle } from "~/libs/enums/enums.js";
import {
	checkIfUserHasPermissions,
	getValidClassNames,
} from "~/libs/helpers/helpers.js";
import {
	useAppSelector,
	useAppTitle,
	useCallback,
	useLocation,
	useMemo,
	useState,
} from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/auth/auth.js";

import {
	CoursesTab,
	GroupsTab,
	UsersTab,
} from "./libs/components/components.js";
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

	const [isAddGroupModalOpen, setIsAddGroupModalOpen] =
		useState<boolean>(false);
	const handleAddGroupModalOpen = useCallback(() => {
		setIsAddGroupModalOpen(true);
	}, []);
	const handleAddGroupModalClose = useCallback(() => {
		setIsAddGroupModalOpen(false);
	}, []);

	const hasAccessToTabs = useMemo(() => {
		const map = new Map<ValueOf<typeof AppRoute>, boolean>();

		for (const link of LINKS.values()) {
			map.set(
				link.to,
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
				return (
					<Navigate
						replace
						to={
							hasAccessToTabs.get(AppRoute.MANAGEMENT_COURSES)
								? AppRoute.MANAGEMENT_COURSES
								: AppRoute.MANAGEMENT_USERS
						}
					/>
				);
			}

			case AppRoute.MANAGEMENT_COURSES: {
				return <CoursesTab />;
			}

			case AppRoute.MANAGEMENT_USERS: {
				return <UsersTab />;
			}

			case AppRoute.MANAGEMENT_GROUPS: {
				return (
					<GroupsTab
						isAddGroupModalOpen={isAddGroupModalOpen}
						onAddGroupModalClose={handleAddGroupModalClose}
					/>
				);
			}

			default: {
				return null;
			}
		}
	};

	const handleActionsRender = (screen: string): React.ReactNode => {
		if (screen === AppRoute.MANAGEMENT_GROUPS) {
			return (
				<Button
					className={styles["add-group-button"]}
					label="+ New group"
					onClick={handleAddGroupModalOpen}
					size="small"
					style="primary"
				/>
			);
		}
	};

	return (
		<div className={styles["wrapper"]}>
			<span className={styles["title"]}>Management</span>
			<div className={styles["buttons-container"]}>
				<ul className={styles["link-list"]}>
					{LINKS.map((link) => {
						const hasAccess = hasAccessToTabs.get(link.to);

						return (
							<li
								className={getValidClassNames(
									styles["link-item"],
									link.to === pathname && styles["active"],
								)}
								key={link.title}
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
				{handleActionsRender(pathname)}
			</div>
			{handleScreenRender(pathname)}
		</div>
	);
};

export { Management };
