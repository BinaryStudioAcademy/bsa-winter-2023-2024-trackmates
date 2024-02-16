import { MultipartFile } from "@fastify/multipart";

import { type S3 } from "~/libs/modules/s3/s3.js";
import { type Service } from "~/libs/types/service.type.js";
import { type ProfileRepository } from "~/modules/profile/profile.repository.js";

import { type AvatarUploadResponseDto } from "./libs/types/types.js";

class ProfileService implements Service {
	private profileRepository: ProfileRepository;
	private s3: S3;

	constructor(profileRepository: ProfileRepository, s3: S3) {
		this.profileRepository = profileRepository;
		this.s3 = s3;
	}

	create(payload: unknown): Promise<unknown> {
		return Promise.resolve(payload);
	}
	delete(): Promise<boolean> {
		return Promise.resolve(true);
	}
	find(): Promise<null> {
		return Promise.resolve(null);
	}
	findAll(): Promise<{ items: [] }> {
		return Promise.resolve({ items: [] });
	}
	update(): Promise<null> {
		return Promise.resolve(null);
	}
	async uploadAvatar(
		uploadedFile: MultipartFile,
	): Promise<AvatarUploadResponseDto> {
		const { file, filename } = uploadedFile;
		const location = await this.s3.upload(file, filename);
		return { location: location };
	}
}

export { ProfileService };
