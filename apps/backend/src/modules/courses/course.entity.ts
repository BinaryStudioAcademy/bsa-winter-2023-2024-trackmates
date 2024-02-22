import { type Entity } from "~/libs/types/types.js";
import { type VendorEntity } from "~/modules/vendors/vendors.js";

class CourseEntity implements Entity {
	private createdAt: string;

	private description: string;

	private id: null | number;

	private image: string;

	private title: string;

	private url: string;

	private vendor: VendorEntity | null;

	private vendorCourseId: string;

	private vendorId: number;

	public updatedAt: string;

	private constructor({
		createdAt,
		description,
		id,
		image,
		title,
		updatedAt,
		url,
		vendor = null,
		vendorCourseId,
		vendorId,
	}: {
		createdAt: string;
		description: string;
		id: null | number;
		image: string;
		title: string;
		updatedAt: string;
		url: string;
		vendor?: VendorEntity | null;
		vendorCourseId: string;
		vendorId: number;
	}) {
		this.createdAt = createdAt;
		this.description = description;
		this.id = id;
		this.image = image;
		this.title = title;
		this.updatedAt = updatedAt;
		this.url = url;
		this.vendor = vendor;
		this.vendorCourseId = vendorCourseId;
		this.vendorId = vendorId;
	}

	public static initialize({
		createdAt,
		description,
		id,
		image,
		title,
		updatedAt,
		url,
		vendor = null,
		vendorCourseId,
		vendorId,
	}: {
		createdAt: string;
		description: string;
		id: null | number;
		image: string;
		title: string;
		updatedAt: string;
		url: string;
		vendor?: VendorEntity | null;
		vendorCourseId: string;
		vendorId: number;
	}): CourseEntity {
		return new CourseEntity({
			createdAt,
			description,
			id,
			image,
			title,
			updatedAt,
			url,
			vendor,
			vendorCourseId,
			vendorId,
		});
	}

	public static initializeNew({
		description,
		image,
		title,
		url,
		vendorCourseId,
		vendorId,
	}: {
		description: string;
		image: string;
		title: string;
		url: string;
		vendorCourseId: string;
		vendorId: number;
	}): CourseEntity {
		return new CourseEntity({
			createdAt: "",
			description,
			id: null,
			image,
			title,
			updatedAt: "",
			url,
			vendor: null,
			vendorCourseId,
			vendorId,
		});
	}

	public toNewObject(): {
		description: string;
		image: string;
		title: string;
		url: string;
		vendorCourseId: string;
		vendorId: number;
	} {
		return {
			description: this.description,
			image: this.image,
			title: this.title,
			url: this.url,
			vendorCourseId: this.vendorCourseId,
			vendorId: this.vendorId,
		};
	}

	public toObject(): {
		createdAt: string;
		description: string;
		id: number;
		image: string;
		title: string;
		updatedAt: string;
		url: string;
		vendor: ReturnType<VendorEntity["toObject"]>;
		vendorCourseId: string;
		vendorId: number;
	} {
		return {
			createdAt: this.createdAt,
			description: this.description,
			id: this.id as number,
			image: this.image,
			title: this.title,
			updatedAt: this.updatedAt,
			url: this.url,
			vendor: (this.vendor as VendorEntity).toObject(),
			vendorCourseId: this.vendorCourseId,
			vendorId: this.vendorId,
		};
	}
}

export { CourseEntity };
