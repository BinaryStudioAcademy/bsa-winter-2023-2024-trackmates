import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	size: "large" | "small";
	title: string;
};

const EmptyPagePlaceholder: React.FC<Properties> = ({
	size,
	title,
}: Properties) => {
	const titleClasses = getValidClassNames(
		styles["empty-page-placeholder"],
		styles[size as string],
	);

	return <p className={titleClasses}>{title}</p>;
};

export { EmptyPagePlaceholder };
