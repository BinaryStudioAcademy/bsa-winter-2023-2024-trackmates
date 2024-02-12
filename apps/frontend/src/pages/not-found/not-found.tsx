import questionCharacter from "~/assets/img/question-character.svg";
import { Button } from "~/libs/components/components.js";

import classes from "./styles.module.css";

const NotFound: React.FC = () => {
	return (
		<div className={classes["not-found-page-container"]}>
			<div className={classes["not-found-page-content-container"]}>
				<div className={classes["content-heading"]}>
					<div className={classes["error-scene"]}>
						<div className={classes["error-sign"]}>
							<div
								className={`${classes["error-sign-head"]} ${classes["octagon"]}`}
							>
								<div
									className={`${classes["error-sign-content"]} ${classes["octagon"]}`}
								>
									<span
										className={`${classes["error-sign-content-text"]} ${classes["octagon"]}`}
									>
										404
									</span>
								</div>
							</div>
							<div className={classes["error-sign-leg"]}></div>
						</div>
						<img alt="question character" src={questionCharacter} />
					</div>
				</div>
				<h2 className={classes["title"]}>Page Not Found</h2>
				<p className={classes["content"]}>
					There is no page you are trying to find.
				</p>
				<div className={classes["actions"]}>
					<Button href="/" label="Go Home" style="filled" />
				</div>
			</div>
		</div>
	);
};

export { NotFound };
