import { Content, Image } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useAppForm } from "~/libs/hooks/hooks.js";
import { type CourseSectionDto } from "~/modules/course-sections/course-sections.js";
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

	const { register, watch } = useAppForm({ defaultValues: { tab: "about" } });

	const selectedTab = watch("tab");

	return (
		<div className={styles["container"]}>
			<div className={styles["title"]}>{title}</div>
			<Image alt="Course" className={styles["image"]} src={image} />
			<form>
				<div className={styles["tabs"]}>
					<input
						{...register("tab")}
						className={styles["tabs-radio"]}
						id="about-tab"
						name="tab"
						type="radio"
						value="about"
					/>
					<label className={styles["label"]} htmlFor="about-tab">
						About
					</label>
					<div
						className={getValidClassNames(
							styles["content"],
							selectedTab === "about" && styles["active"],
						)}
					>
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
						{...register("tab")}
						className={styles["tabs-radio"]}
						id="details-tab"
						name="tab"
						type="radio"
						value="details"
					/>
					<label className={styles["label"]} htmlFor="details-tab">
						Details
					</label>
					<div
						className={getValidClassNames(
							styles["content"],
							selectedTab === "details" && styles["active"],
						)}
					>
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
			</form>
		</div>
	);
};

export { CourseDetails };
