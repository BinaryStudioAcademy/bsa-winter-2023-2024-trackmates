import { type SectionStatusDto } from "./section-status-response-dto.type.js";

type SectionStatusAddRequestDto = Omit<SectionStatusDto, "id">;

export { type SectionStatusAddRequestDto };
