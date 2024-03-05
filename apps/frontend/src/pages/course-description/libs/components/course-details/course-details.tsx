import { Button, Content, Image } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useState } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type CourseSectionDto } from "~/modules/course-sections/course-sections.js";
import { type CourseDto } from "~/modules/courses/courses.js";

import { Tab } from "./libs/enums/enums.js";
import { tabToReadable } from "./libs/maps/maps.js";
import styles from "./styles.module.css";

type Properties = {
	course: CourseDto;
	courseSections: CourseSectionDto[];
};

const CourseDetails: React.FC<Properties> = ({
	course,
	courseSections,
}: Properties) => {
	const { description, image, title, url, vendor } = course;

	const [selectedTab, setSelectedTab] = useState<ValueOf<typeof Tab>>(
		Tab.ABOUT,
	);

	const handleTabChange = useCallback((item: ValueOf<typeof Tab>) => {
		return () => {
			setSelectedTab(item);
		};
	}, []);

	const handleTabContentRender = (
		selectedTab: ValueOf<typeof Tab>,
	): React.ReactNode => {
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
			<ul className={styles["tabs"]}>
				{Object.values(Tab).map((item) => (
					<li className={styles["tab-item"]} key={item}>
						<Button
							className={getValidClassNames(
								styles["button"],
								item === selectedTab && styles["active"],
							)}
							label={tabToReadable[item]}
							onClick={handleTabChange(item)}
							type="button"
						/>
					</li>
				))}
			</ul>
			<div>{handleTabContentRender(selectedTab)}</div>
		</div>
	);
};

export { CourseDetails };
