import { DEFAULT_COURSES_DATA } from "~/libs/constants/constants.js";

import { Course } from "../course/course.js";
import styles from "./styles.module.css";

type CourseData = {
	id: string;
	image: string;
	source: string;
	title: string;
};

const CourseList: React.FC = () => {
	return (
		<div className={styles["container"]}>
			<h2 className={styles["title"]}>Courses</h2>
			<ul className={styles["list"]}>
				{DEFAULT_COURSES_DATA.map((course: CourseData) => {
					return (
						<li key={course.id}>
							<Course
								image={course.image}
								source={course.source}
								title={course.title}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export { CourseList };
