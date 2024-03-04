import { Content, Image, TabItem } from "~/libs/components/components.js";
import { useAppForm, useCallback, useState } from "~/libs/hooks/hooks.js";
import { type CourseSectionDto } from "~/modules/course-sections/course-sections.js";
import { type CourseDto } from "~/modules/courses/courses.js";

import { Tab } from "./libs/enums/enums.js";
import { tabToReadable } from "./libs/maps/maps.js";
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

	const handleFormChange = useCallback(
		(event_: React.BaseSyntheticEvent) => {
			void handleSubmit(handleTabChange)(event_);
		},
		[handleSubmit],
	);

	const handleTabContentRender = (selectedTab: string): React.ReactNode => {
		switch (selectedTab) {
			case Tab.ABOUT: {
				return (
					<div className={styles["content"]}>
						<div className={styles["content-title"]}>About this course</div>
						<Content content={description} />
						<a
							className={styles["link"]}
							href={`${vendor.url}${url}`}
							rel="noreferrer"
							target="_blank"
						>
							Read more
						</a>
					</div>
				);
			}

			case Tab.DETAILS: {
				return (
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
				);
			}
		}

		return null;
	};

	return (
		<div className={styles["container"]}>
			<div className={styles["title"]}>{title}</div>
			<Image alt="Course" className={styles["image"]} src={image} />
			<form onChange={handleFormChange}>
				<ul className={styles["tabs"]}>
					{Object.values(Tab).map((item) => (
						<li className={styles["tab-item"]} key={item}>
							<TabItem
								isSelected={item === selectedTab}
								label={tabToReadable[item]}
								name="tab"
								register={register}
								tab={item}
							/>
						</li>
					))}
				</ul>
			</form>
			<div>{handleTabContentRender(selectedTab)}</div>
		</div>
	);
};

export { CourseDetails };
