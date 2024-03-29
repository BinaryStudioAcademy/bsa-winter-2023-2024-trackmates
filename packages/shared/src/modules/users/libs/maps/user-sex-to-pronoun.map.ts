import { UserSex } from "../enums/enums.js";

const userSexToPronoun = {
	[UserSex.FEMALE]: {
		OBJECTIVE: "her",
		SUBJECTIVE: "she",
	},
	[UserSex.MALE]: {
		OBJECTIVE: "him",
		SUBJECTIVE: "he",
	},
	[UserSex.PREFER_NOT_TO_SAY]: {
		OBJECTIVE: "them",
		SUBJECTIVE: "they",
	},
} as const;

export { userSexToPronoun };
