import { type Entity } from "~/libs/types/types.js";
import { type VendorEntity } from "~/modules/vendors/vendors.js";

class UserCourseEntity implements Entity {
	private createdAt: string;

	private description: string;

	private id: null | number;

	private image: string;

	private progress: number;

	private title: string;

	private updatedAt: string;

	private url: string;

	private vendor: VendorEntity | null;

	private vendorCourseId: string;

	private vendorId: number;

	private constructor({
		createdAt,
		description,
		id,
		image,
		progress,
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
		progress: number;
		title: string;
		updatedAt: string;
		url: string;
		vendor: VendorEntity | null;
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
		this.progress = progress;
	}

	public static initialize({
		createdAt,
		description,
		id,
		image,
		progress,
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
		progress: number;
		title: string;
		updatedAt: string;
		url: string;
		vendor: VendorEntity | null;
		vendorCourseId: string;
		vendorId: number;
	}): UserCourseEntity {
		return new UserCourseEntity({
			createdAt,
			description,
			id,
			image,
			progress,
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
		progress,
		title,
		url,
		vendorCourseId,
		vendorId,
	}: {
		description: string;
		image: string;
		progress: number;
		title: string;
		url: string;
		vendorCourseId: string;
		vendorId: number;
	}): UserCourseEntity {
		return new UserCourseEntity({
			createdAt: "",
			description,
			id: null,
			image,
			progress,
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
		progress: number;
		title: string;
		url: string;
		vendorCourseId: string;
		vendorId: number;
	} {
		return {
			description: this.description,
			image: this.image,
			progress: this.progress,
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
		progress: number;
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
			progress: this.progress,
			title: this.title,
			updatedAt: this.updatedAt,
			url: this.url,
			vendor: (this.vendor as VendorEntity).toObject(),
			vendorCourseId: this.vendorCourseId,
			vendorId: this.vendorId,
		};
	}
}

export { UserCourseEntity };
