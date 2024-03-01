import { type SectionStatusResponseDto } from "./section-status-response-dto.type.js";

type SectionStatusAddRequestDto = Omit<
	SectionStatusResponseDto,
	"id" | "userId"
>;

export { type SectionStatusAddRequestDto };
