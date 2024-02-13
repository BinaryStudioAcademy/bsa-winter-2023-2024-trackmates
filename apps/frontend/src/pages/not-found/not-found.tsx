import questionCharacter from "~/assets/img/question-character.svg";
import { Button } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

const NotFound: React.FC = () => {
	return (
		<div className={styles["not-found-page-container"]}>
			<div className={styles["not-found-page-content-container"]}>
				<div className={styles["content-heading"]}>
					<div className={styles["error-scene"]}>
						<div className={styles["error-sign"]}>
							<div
								className={getValidClassNames(
									styles["error-sign-head"],
									styles["octagon"],
								)}
							>
								<div
									className={getValidClassNames(
										styles["error-sign-content"],
										styles["octagon"],
									)}
								>
									<span
										className={getValidClassNames(
											styles["error-sign-content-text"],
											styles["octagon"],
										)}
									>
										404
									</span>
								</div>
							</div>
							<div className={styles["error-sign-leg"]} />
						</div>
						<img
							alt="question character"
							className={styles["error-scene-img"]}
							src={questionCharacter}
						/>
					</div>
				</div>
				<h2 className={styles["title"]}>Page Not Found</h2>
				<p className={styles["content"]}>
					There is no page you are trying to find.
				</p>
				<div className={styles["actions"]}>
					<Button href="/" label="Go Home" style="filled" />
				</div>
			</div>
		</div>
	);
};

export { NotFound };
