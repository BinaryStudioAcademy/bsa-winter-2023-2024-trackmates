import { Content, Image, TabItem } from "~/libs/components/components.js";
import { initDebounce } from "~/libs/helpers/helpers.js";
import { useAppForm, useState } from "~/libs/hooks/hooks.js";
import { type CourseSectionDto } from "~/modules/course-sections/course-sections.js";
import { type CourseDto } from "~/modules/courses/courses.js";

import { COURSE_DETAILS_DELAY_MS } from "./libs/constants/constants.js";
import { Tab } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

type TabValue = {
	tab: string;
};

type Properties = {
	course: CourseDto;
	courseSections: CourseSectionDto[];
};

const CourseDetails: React.FC<Properties> = ({
	course,
	courseSections,
}: Properties) => {
	const { description, image, title, url, vendor } = course;

	const { handleSubmit, register } = useAppForm({
		defaultValues: { tab: Tab.ABOUT },
	});

	const [selectedTab, setSelectedTab] = useState<string>(Tab.ABOUT);

	const handleTabChange = (item: TabValue): void => {
		setSelectedTab(item.tab);
	};

	const handleFormChange = initDebounce((event_: React.BaseSyntheticEvent) => {
		void handleSubmit(handleTabChange)(event_);
	}, COURSE_DETAILS_DELAY_MS);

	const tabContents = {
		[Tab.ABOUT]: (
			<div className={styles["content"]}>
				<div className={styles["content-title"]}>About this course</div>
				<Content string={description} />
				<a
					className={styles["link"]}
					href={`${vendor.url}${url}`}
					rel="noreferrer"
					target="_blank"
				>
					Read more
				</a>
			</div>
		),
		[Tab.DETAILS]: (
			<div className={styles["content"]}>
				<div className={styles["content-title"]}>Course Details</div>
				<ul className={styles["details-list"]}>
					{courseSections.map((section) => (
						<li className={styles["details-item"]} key={section.id}>
							{section.title}
						</li>
					))}
				</ul>
			</div>
		),
	};

	return (
		<div className={styles["container"]}>
			<div className={styles["title"]}>{title}</div>
			<Image alt="Course" className={styles["image"]} src={image} />
			<form onChange={handleFormChange}>
				<div className={styles["tabs"]}>
					{Object.values(Tab).map((item) => (
						<TabItem
							key={item}
							label={item === Tab.ABOUT ? "About" : "Details"}
							name="tab"
							register={register}
							selectedTab={selectedTab}
							tab={item}
							tabContents={tabContents}
						/>
					))}
				</div>
			</form>
		</div>
	);
};

export { CourseDetails };
