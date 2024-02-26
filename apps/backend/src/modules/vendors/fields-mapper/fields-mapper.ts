import { type ValueOf } from "~/libs/types/types.js";

import {
	type CourseField,
	type CourseSectionField,
	UdemyCourseFieldsMapping,
	UdemyCourseSectionFieldsMapping,
} from "../libs/enums/enums.js";
import {
	type CourseFieldForMap,
	type CourseSectionFieldForMap,
} from "../libs/types/types.js";

class FieldsMapper<FROM_FIELD extends string, TO_FIELD extends string> {
	private mapping: Record<TO_FIELD, FROM_FIELD>;

	public constructor(mapping: Record<TO_FIELD, FROM_FIELD>) {
		this.mapping = mapping;
	}

	public mapItem(item: Record<FROM_FIELD, unknown>): Record<TO_FIELD, unknown> {
		const mappingEntries = Object.entries(this.mapping) as [
			TO_FIELD,
			FROM_FIELD,
		][];
		const mappedItem = {} as Record<TO_FIELD, unknown>;

		for (const [to, from] of mappingEntries) {
			mappedItem[to] = item[from];
		}

		return mappedItem;
	}
}

const udemyCourseFieldsMapper = new FieldsMapper<
	ValueOf<typeof CourseField>,
	CourseFieldForMap
>(UdemyCourseFieldsMapping);

const udemyCourseSectionFieldsMapper = new FieldsMapper<
	ValueOf<typeof CourseSectionField>,
	CourseSectionFieldForMap
>(UdemyCourseSectionFieldsMapping);

export { udemyCourseFieldsMapper, udemyCourseSectionFieldsMapper };
