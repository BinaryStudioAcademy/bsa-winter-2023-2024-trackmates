import { logger } from "~/libs/modules/logger/logger.js";
import { s3 } from "~/libs/modules/s3/s3.js";

import { ProfileController } from "./profile.controller.js";
import { ProfileRepository } from "./profile.repository.js";
import { ProfileService } from "./profile.service.js";

const profileRepository = new ProfileRepository();
const profileService = new ProfileService(profileRepository, s3);
const profileController = new ProfileController(logger, profileService);

export { profileController };
