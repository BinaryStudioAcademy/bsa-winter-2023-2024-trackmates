const getZodEnum = <T>(array: T[]): [T, ...T[]] => array as [T, ...T[]];

export { getZodEnum };
