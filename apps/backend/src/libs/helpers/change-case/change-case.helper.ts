import * as changeStringCase from "change-case";

import { type CaseType, type ValueOf } from "~/libs/types/types.js";

const caseTypeToFunction: Record<CaseType, ValueOf<typeof changeStringCase>> = {
	header: changeStringCase.capitalCase,
	kebab: changeStringCase.kebabCase,
};

const changeCase = (string: string, caseType: CaseType): string => {
	return caseTypeToFunction[caseType](string) as string;
};

export { changeCase };
