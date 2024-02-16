import { type Udemy } from "~/libs/modules/udemy/udemy.js";

type Constructor = {
	udemy: Udemy;
};

class CourseService {
	private udemy: Udemy;

	public constructor({ udemy }: Constructor) {
		this.udemy = udemy;
	}

	public findAllByVendor(): Promise<unknown> {
		return this.udemy.getCourses().then((result) => result.json());
	}
}

export { CourseService };
