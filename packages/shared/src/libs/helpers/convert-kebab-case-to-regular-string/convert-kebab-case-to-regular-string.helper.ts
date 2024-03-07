import { Separator, StringConstant } from "./libs/enums/enums.js";
import { type Options } from "./libs/types/types.js";

const convertKebabCaseToRegularString = (
	kebabCaseString: string,
	options: Options,
): string => {
	let regularString = kebabCaseString.replaceAll(
		Separator.KEBAB_CASE,
		Separator.REGULAR,
	);

	if (options.capitalize) {
		const firstCharacter = regularString
			.charAt(StringConstant.FIRST_CHARACTER)
			.toUpperCase();
		const stringFromSecondCharacter = regularString.slice(
			StringConstant.SECOND_CHARACTER,
		);
		regularString = firstCharacter + stringFromSecondCharacter;
	}

	return regularString;
};

export { convertKebabCaseToRegularString };
