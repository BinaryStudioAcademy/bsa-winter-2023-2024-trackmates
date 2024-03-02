export { ActivitiesApiPath } from "./libs/enums/enums.js";
export {
	type ActivityDto,
	type ActivityPayloadMap,
	type ActivityType,
	// type FinishCourseDto,
	// type FinishSectionDto,
	type GetActivitiesResponseDto,
} from "./libs/types/types.js";
export {
	actionIdParameter as actionIdParameterValidationSchema,
	applyFinishSection as applyFinishSectionValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
