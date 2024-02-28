import { type SectionStatusDto } from "./section-status-response-dto.type.js";

type SectionStatusUpdateRequestDto = Pick<SectionStatusDto, "status">;

export { type SectionStatusUpdateRequestDto };
