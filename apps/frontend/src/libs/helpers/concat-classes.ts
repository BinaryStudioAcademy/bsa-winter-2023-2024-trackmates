import clsx from "clsx";

type classType = string | undefined;

const concatClasses = (...classNames: classType[]): string => {
	return clsx(classNames);
};

export { concatClasses };
