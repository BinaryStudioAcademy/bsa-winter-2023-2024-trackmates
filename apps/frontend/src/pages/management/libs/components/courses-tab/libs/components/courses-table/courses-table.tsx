import { Table } from "~/libs/components/components.js";
import { type DataStatus } from "~/libs/enums/enums.js";
import { useMemo } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type CourseDto } from "~/modules/courses/courses.js";

import { CoursesTableColumnAlign } from "./libs/enums/enums.js";
import { getCourseColumns, getCourseData } from "./libs/helpers/helpers.js";

type Properties = {
	courseToDataStatus: Record<
		number,
		{
			deleteDataStatus?: ValueOf<typeof DataStatus>;
			updateDataStatus?: ValueOf<typeof DataStatus>;
		}
	>;
	courses: CourseDto[];
	onDelete: (courseId: number) => void;
	onEdit: (courseId: number) => void;
};

const CoursesTable: React.FC<Properties> = ({
	courseToDataStatus,
	courses,
	onDelete,
	onEdit,
}: Properties) => {
	const courseData = useMemo(() => {
		return getCourseData(courses);
	}, [courses]);

	const courseColumns = useMemo(() => {
		return getCourseColumns({
			courseToDataStatus,
			onDelete,
			onEdit,
		});
	}, [courseToDataStatus, onDelete, onEdit]);

	return (
		<Table
			columnAlign={CoursesTableColumnAlign}
			columns={courseColumns}
			data={courseData}
		/>
	);
};

export { CoursesTable };
