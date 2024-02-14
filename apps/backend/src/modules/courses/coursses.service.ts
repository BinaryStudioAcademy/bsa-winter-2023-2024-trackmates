import { type Udemy } from "~/libs/modules/udemy/udemy.js";

type Constructor = {
	udemy: Udemy;
};

class CoursesService {
	private udemy: Udemy;

	public constructor({ udemy }: Constructor) {
		this.udemy = udemy;
	}

	public search(): Promise<unknown> {
		return this.udemy.getCourses({}).then((result) => result.json());
	}
}

export { CoursesService };
