import { type SectionStatusResponseDto } from "./section-status-response-dto.type.js";

type SectionStatusUpdateRequestDto = Pick<SectionStatusResponseDto, "status">;

export { type SectionStatusUpdateRequestDto };
