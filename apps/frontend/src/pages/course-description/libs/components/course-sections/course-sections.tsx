import { DataStatus } from "~/libs/enums/data-status.enum.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { type UserAuthResponseDto } from "~/modules/auth/auth.js";
import {
	type CourseSectionDto,
	type CourseSectionWithStatusDto,
} from "~/modules/course-sections/course.sections.js";
import {
	SectionStatus,
	actions as sectionStatusActions,
} from "~/modules/section-statuses/section-statuses.js";

import { SectionStatusCheckbox } from "../section-status-checkbox/section-status-checkbox.js";
import styles from "./styles.module.css";

type Properties = {
	courseId: number;
	courseSections: CourseSectionDto[];
};

const CourseSections: React.FC<Properties> = ({
	courseId,
	courseSections,
}: Properties) => {
	const dispatch = useAppDispatch();
	const { sectionStatuses, user } = useAppSelector((state) => {
		return {
			isLoading: state.sectionStatuses.dataStatus === DataStatus.PENDING,
			sectionStatuses: state.sectionStatuses.sectionStatuses,
			user: state.auth.user as UserAuthResponseDto,
		};
	});

	const handleToggle = useCallback(
		(section: CourseSectionWithStatusDto) => {
			if (!section.status) {
				return void dispatch(
					sectionStatusActions.create({
						courseSectionId: section.id as number,
						status: SectionStatus.COMPLETED,
					}),
				);
			}

			void dispatch(
				sectionStatusActions.updateStatus({
					payload: {
						status:
							section.status.status === SectionStatus.COMPLETED
								? SectionStatus.IN_PROGRESS
								: SectionStatus.COMPLETED,
					},
					sectionStatusId: section.status.id,
				}),
			);
		},
		[dispatch],
	);

	useEffect(() => {
		void dispatch(
			sectionStatusActions.getAll({ courseId: courseId, userId: user.id }),
		);
	}, [courseId, dispatch, user.id]);

	const sections = courseSections.map((section) => {
		return {
			...section,
			status:
				sectionStatuses.find((sectionStatus) => {
					return sectionStatus.courseSectionId === section.id;
				}) ?? null,
		};
	});

	return (
		<div className={styles["container"]}>
			<div className={styles["title"]}>Course Content</div>
			<ul className={styles["list"]}>
				{sections.map((section) => {
					return (
						<li className={styles["item"]} key={section.id}>
							{section.title}
							<SectionStatusCheckbox
								isChecked={section.status?.status === SectionStatus.COMPLETED}
								name={`section-${section.id}-status`}
								onToggle={handleToggle}
								section={section}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export { CourseSections };
