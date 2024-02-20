import React from "react";

import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useState } from "~/libs/hooks/hooks.js";

import { DEFAULT_TAB_INDEX } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	tabs: Record<string, React.ReactNode>;
};

const Tabs: React.FC<Properties> = ({ tabs }: Properties) => {
	const [activeTabIndex, setActiveTabIndex] = useState(DEFAULT_TAB_INDEX);

	const handleClick = useCallback((index: number) => {
		return () => {
			setActiveTabIndex(index);
		};
	}, []);

	const handleKeyDown = useCallback(
		(index: number) => {
			return (event: React.KeyboardEvent<HTMLLIElement>) => {
				if (event.code === "Enter" || event.code === "Space") {
					handleClick(index)();
				}
			};
		},
		[handleClick],
	);

	return (
		<>
			<ul className={styles["tab-list"]}>
				{Object.keys(tabs).map((tab, index) => (
					<li
						className={getValidClassNames(
							styles["tab"],
							activeTabIndex === index && styles["tab--selected"],
						)}
						key={index}
						onClick={handleClick(index)}
						onKeyDown={handleKeyDown(index)}
						role="tab"
						tabIndex={0}
					>
						{tab}
					</li>
				))}
			</ul>
			{Object.values(tabs).map(
				(content, index) =>
					index === activeTabIndex && (
						<React.Fragment key={index}>{content}</React.Fragment>
					),
			)}
		</>
	);
};

export { Tabs };
