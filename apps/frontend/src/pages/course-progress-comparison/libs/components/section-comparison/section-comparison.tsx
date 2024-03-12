import { SectionStatusCheckbox } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks.js";
import { type CourseSectionDto } from "~/modules/course-sections/course-sections.js";
import {
	SectionStatus,
	type SectionStatusResponseDto,
	actions as sectionStatusActions,
} from "~/modules/section-statuses/section-statuses.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { getStatusBySectionId } from "../../helpers/helpers.js";
import styles from "./styles.module.css";

type Properties = {
	courseSections: CourseSectionDto[];
};

const SectionComparison: React.FC<Properties> = ({
	courseSections,
}: Properties) => {
	const dispatch = useAppDispatch();
	const { friend, sectionStatuses, sectionToCompareStatuses } = useAppSelector(
		(state) => {
			return {
				currentUser: state.auth.user as UserAuthResponseDto,
				friend: state.users.profileUser,
				sectionStatuses: state.sectionStatuses.sectionStatuses,
				sectionToCompareStatuses:
					state.sectionStatuses.sectionToCompareStatuses,
			};
		},
	);

	const friendName = friend ? friend.nickname ?? friend.firstName : "Friend";

	const handleToggle = useCallback(
		(sectionId: number, sectionStatus: SectionStatusResponseDto | null) =>
			() => {
				if (!sectionStatus) {
					return void dispatch(
						sectionStatusActions.create({
							courseSectionId: sectionId,
							status: SectionStatus.COMPLETED,
						}),
					);
				}

				void dispatch(
					sectionStatusActions.updateStatus({
						payload: {
							status:
								sectionStatus.status === SectionStatus.COMPLETED
									? SectionStatus.IN_PROGRESS
									: SectionStatus.COMPLETED,
						},
						sectionStatusId: sectionStatus.id,
					}),
				);
			},
		[dispatch],
	);

	return (
		<div className={styles["container"]}>
			<div className={styles["head"]}>
				<div className={styles["row-item"]}>Progress</div>
				<div className={styles["row-item"]}>You</div>
				<div className={styles["row-item"]}>{friendName}</div>
			</div>
			<div className={styles["content"]}>
				{courseSections.map((section) => {
					const userStatus = getStatusBySectionId(
						section.id as number,
						sectionStatuses,
					);
					const friendStatus = getStatusBySectionId(
						section.id as number,
						sectionToCompareStatuses,
					);

					return (
						<div className={styles["section"]} key={section.id}>
							<div className={styles["row-item"]}>{section.title}</div>
							<div className={styles["row-item"]}>
								<SectionStatusCheckbox
									isChecked={userStatus?.status === SectionStatus.COMPLETED}
									name={`section-${section.id}-status`}
									onToggle={handleToggle(section.id as number, userStatus)}
								/>
							</div>
							<div className={styles["row-item"]}>
								<SectionStatusCheckbox
									isChecked={friendStatus?.status === SectionStatus.COMPLETED}
									isDisabled
									name={`section-${section.id}-status`}
									onToggle={handleToggle(section.id as number, friendStatus)}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export { SectionComparison };
