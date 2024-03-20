type ExtractPath<T> = keyof T extends infer Key
	? Key extends keyof T & string
		? T[Key] extends Record<string, unknown>
			? `${Key}.${ExtractPath<T[Key]>}` | `${Key}`
			: Key
		: never
	: never;

export { type ExtractPath };
