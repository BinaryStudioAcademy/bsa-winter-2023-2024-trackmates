import { Content, Image } from "~/libs/components/components.js";
import { useCallback, useState } from "~/libs/hooks/hooks.js";
import { type CourseSectionDto } from "~/modules/course-sections/course.sections.js";
import { type CourseDto } from "~/modules/courses/courses.js";

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

	const [isChecked, setIsChecked] = useState<boolean>(true);

	const handleCheckboxChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setIsChecked(event.target.checked);
		},
		[],
	);

	return (
		<div className={styles["container"]}>
			<div className={styles["title"]}>{title}</div>
			<Image alt="Course" className={styles["image"]} src={image} />
			<div className={styles["tabs"]}>
				<input
					checked={isChecked}
					className={styles["tabs-radio"]}
					id="tab1"
					name="tabs-example"
					onChange={handleCheckboxChange}
					type="radio"
				/>
				<label className={styles["label"]} htmlFor="tab1">
					About
				</label>
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
				<input
					className={styles["tabs-radio"]}
					id="tab2"
					name="tabs-example"
					onChange={handleCheckboxChange}
					type="radio"
				/>
				<label className={styles["label"]} htmlFor="tab2">
					Details
				</label>
				<div className={styles["content"]}>
					<div className={styles["content-title"]}>Course Details</div>
					<ul className={styles["details-list"]}>
						{courseSections.map((section) => {
							return (
								<li className={styles["details-item"]} key={section.id}>
									{section.title}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export { CourseDetails };
