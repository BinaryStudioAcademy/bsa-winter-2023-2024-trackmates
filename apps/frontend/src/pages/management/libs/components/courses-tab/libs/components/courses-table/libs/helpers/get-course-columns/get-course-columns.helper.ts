import { type Column } from "react-table";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type ActionsCellProperties } from "~/pages/management/libs/components/actions-cell/libs/types/types.js";
import { ActionsCell } from "~/pages/management/libs/components/components.js";

import { CourseText, VendorLogo } from "../../components/components.js";
import { CoursesTableAccessor, CoursesTableHeader } from "../../enums/enums.js";
import { type CoursesTableRow } from "../../types/types.js";

const getCourseColumns = ({
	courseToDataStatus,
	onDelete,
	onEdit,
}: {
	courseToDataStatus: Record<
		number,
		{
			deleteDataStatus?: ValueOf<typeof DataStatus>;
			updateDataStatus?: ValueOf<typeof DataStatus>;
		}
	>;
	onDelete: (courseId: number) => void;
	onEdit: (courseId: number) => void;
}): Column<CoursesTableRow>[] => {
	return [
		{
			Header: CoursesTableHeader.ID,
			accessor: CoursesTableAccessor.ID,
			width: 50,
		},
		{
			Cell: CourseText,
			Header: CoursesTableHeader.TITLE,
			accessor: CoursesTableAccessor.TITLE,
			width: 185,
		},
		{
			Cell: VendorLogo,
			Header: CoursesTableHeader.VENDOR,
			accessor: CoursesTableAccessor.VENDOR,
			width: 80,
		},
		{
			Cell: CourseText,
			Header: CoursesTableHeader.DESCRIPTION,
			accessor: CoursesTableAccessor.DESCRIPTION,
			width: 225,
		},
		{
			Cell: ActionsCell,
			Header: CoursesTableHeader.ACTIONS,
			accessor: ({ id }): ActionsCellProperties => {
				return {
					isDeleteDisabled: false,
					isDeleteLoading:
						courseToDataStatus[id]?.deleteDataStatus === DataStatus.PENDING,
					isEditDisabled: false,
					isEditLoading:
						courseToDataStatus[id]?.updateDataStatus === DataStatus.PENDING,
					onDelete: (): void => {
						onDelete(id);
					},
					onEdit: (): void => {
						onEdit(id);
					},
				};
			},
			width: 100,
		},
	];
};

export { getCourseColumns };
