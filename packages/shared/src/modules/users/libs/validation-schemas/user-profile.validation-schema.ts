import { z } from "zod";

import { type ValueOf } from "../../../../libs/types/types.js";
import {
	UserSex,
	UserValidationMessage,
	UserValidationRule,
} from "../enums/enums.js";

type UserSexValuesType = ValueOf<typeof UserSex>;

type UserProfileRequestValidationDto = {
	firstName: z.ZodString;
	lastName: z.ZodString;
	nickname: z.ZodNullable<
		z.ZodPipeline<
			z.ZodEffects<z.ZodString, null | string, string>,
			z.ZodUnion<[z.ZodString, z.ZodLiteral<null>]>
		>
	>;
	sex: z.ZodNullable<z.ZodEnum<[UserSexValuesType, ...UserSexValuesType[]]>>;
};

const userProfile = z.object<UserProfileRequestValidationDto>({
	firstName: z
		.string()
		.trim()
		.min(UserValidationRule.FIELD_MINIMUM_LENGTH, {
			message: UserValidationMessage.FIELD_REQUIRE,
		})
		.regex(/^['A-Za-z-]*$/, {
			message: UserValidationMessage.FIRST_NAME_INVALID_CHARACTERS,
		})
		.regex(/^[^-]*-?[^-]*$/, {
			message: UserValidationMessage.FIRST_NAME_INVALID_CHARACTERS,
		})
		.regex(/^[^']*'?[^']*$/, {
			message: UserValidationMessage.FIRST_NAME_INVALID_CHARACTERS,
		})
		.regex(/^(?!['-])(?!.*['-]$)['A-Za-z-]*$/, {
			message: UserValidationMessage.FIRST_LAST_CHARACTERS_ONLY_LETTERS,
		})
		.regex(/^(?!.*['-]{2})['A-Za-z-]*$/, {
			message: UserValidationMessage.ADJACENT_HYPHEN_APOSTROPHE,
		})
		.min(UserValidationRule.FIRST_NAME_MINIMUM_LENGTH, {
			message: UserValidationMessage.FIRST_NAME_MINIMUM_LENGTH,
		})
		.max(UserValidationRule.FIRST_NAME_MAXIMUM_LENGTH, {
			message: UserValidationMessage.FIRST_NAME_MAXIMUM_LENGTH,
		}),
	lastName: z
		.string()
		.trim()
		.min(UserValidationRule.FIELD_MINIMUM_LENGTH, {
			message: UserValidationMessage.FIELD_REQUIRE,
		})
		.regex(/^['A-Za-z-]*$/, {
			message: UserValidationMessage.LAST_NAME_INVALID_CHARACTERS,
		})
		.regex(/^[^-]*-?[^-]*$/, {
			message: UserValidationMessage.LAST_NAME_INVALID_CHARACTERS,
		})
		.regex(/^[^']*'?[^']*$/, {
			message: UserValidationMessage.LAST_NAME_INVALID_CHARACTERS,
		})
		.regex(/^(?!['-])(?!.*['-]$)['A-Za-z-]*$/, {
			message: UserValidationMessage.FIRST_LAST_CHARACTERS_ONLY_LETTERS,
		})
		.regex(/^(?!.*['-]{2})['A-Za-z-]*$/, {
			message: UserValidationMessage.ADJACENT_HYPHEN_APOSTROPHE,
		})
		.min(UserValidationRule.LAST_NAME_MINIMUM_LENGTH, {
			message: UserValidationMessage.LAST_NAME_MINIMUM_LENGTH,
		})
		.max(UserValidationRule.LAST_NAME_MAXIMUM_LENGTH, {
			message: UserValidationMessage.LAST_NAME_MAXIMUM_LENGTH,
		}),
	nickname: z
		.string()
		.transform((value) => {
			return value === "" ? null : value;
		})
		.pipe(
			z
				.string()
				.trim()
				.min(UserValidationRule.FIELD_MINIMUM_LENGTH, {
					message: UserValidationMessage.FIELD_REQUIRE,
				})
				.regex(/^[\d_a-z]+$/, {
					message: UserValidationMessage.NICKNAME_INVALID_CHARACTERS,
				})
				.regex(/[a-z]/, {
					message: UserValidationMessage.NICKNAME_AT_LEAST_ONE_LETTER,
				})
				.min(UserValidationRule.NICKNAME_MINIMUM_LENGTH, {
					message: UserValidationMessage.NICKNAME_MINIMUM_LENGTH,
				})
				.max(UserValidationRule.NICKNAME_MAXIMUM_LENGTH, {
					message: UserValidationMessage.NICKNAME_MAXIMUM_LENGTH,
				})
				.or(z.literal(null)),
		)
		.nullable(),
	sex: z
		.enum([UserSex.MALE, UserSex.FEMALE, UserSex.PREFER_NOT_TO_SAY])
		.nullable(),
});

export { userProfile };
