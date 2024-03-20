type GetFieldType<TData, TPath> = TPath extends `${infer Left}.${infer Right}`
	? Left extends keyof TData
		?
				| Extract<TData[Left], undefined>
				| GetFieldType<Exclude<TData[Left], undefined>, Right>
		: undefined
	: TPath extends keyof TData
		? TData[TPath]
		: undefined;

function getValueByPath<TData, TPath extends string>(
	data: TData,
	path: TPath,
): GetFieldType<TData, TPath> {
	const pathArray = path.split(".");

	let result: unknown = data;

	for (const key of pathArray) {
		if (!result || typeof result !== "object" || !(key in result)) {
			return undefined as GetFieldType<TData, TPath>;
		}

		result = (result as Record<string, unknown>)[key];
	}

	return result as GetFieldType<TData, TPath>;
}

export { getValueByPath };
