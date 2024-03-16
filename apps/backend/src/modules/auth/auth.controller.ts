import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import {
	type UserAuthResponseDto,
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
	userSignInValidationSchema,
	userSignUpValidationSchema,
} from "~/modules/users/users.js";

import { type AuthService } from "./auth.service.js";
import { AuthApiPath } from "./libs/enums/enums.js";
import {
	type AuthSendUpdatePasswordLinkRequestDto,
	type AuthUpdatePasswordRequestDto,
} from "./libs/types/types.js";
import {
	authSendUpdatePasswordLinkValidationSchema,
	authUpdatePasswordValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";

/***
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          avatarUrl:
 *            type: string
 *            nullable: true
 *          createdAt:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *          firstName:
 *            type: string
 *          groups:
 *            type: array
 *            items:
 *              type: object
 *              $ref: "#/components/schemas/Group"
 *          id:
 *            type: number
 *            minimum: 1
 *          lastName:
 *            type: string
 *          nickname:
 *            type: string
 *            nullable: true
 *          sex:
 *            type: string
 *            enum: [male, female, prefer-not-to-say]
 *          updatedAt:
 *            type: string
 */
class AuthController extends BaseController {
	private authService: AuthService;

	public constructor(logger: Logger, authService: AuthService) {
		super(logger, APIPath.AUTH);

		this.authService = authService;

		this.addRoute({
			handler: (options) =>
				this.signUp(
					options as APIHandlerOptions<{
						body: UserSignUpRequestDto;
					}>,
				),
			method: "POST",
			path: AuthApiPath.SIGN_UP,
			validation: {
				body: userSignUpValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => {
				return this.sendUpdatePasswordLink(
					options as APIHandlerOptions<{
						body: AuthSendUpdatePasswordLinkRequestDto;
					}>,
				);
			},
			method: "POST",
			path: AuthApiPath.SEND_UPDATE_PASSWORD_LINK,
			validation: {
				body: authSendUpdatePasswordLinkValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => {
				return this.updatePassword(
					options as APIHandlerOptions<{
						body: AuthUpdatePasswordRequestDto;
					}>,
				);
			},
			method: "PATCH",
			path: AuthApiPath.UPDATE_PASSWORD,
			validation: {
				body: authUpdatePasswordValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.getAuthenticatedUser(
					options as APIHandlerOptions<{ user: UserAuthResponseDto | null }>,
				),
			method: "GET",
			path: AuthApiPath.AUTHENTICATED_USER,
		});

		this.addRoute({
			handler: (options) =>
				this.signIn(
					options as APIHandlerOptions<{
						body: UserSignInRequestDto;
					}>,
				),
			method: "POST",
			path: AuthApiPath.SIGN_IN,
			validation: {
				body: userSignInValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /auth/authenticated-user:
	 *    get:
	 *      tags:
	 *        - Authentication
	 *      security:
	 *        - bearerAuth: []
	 *      description: Return current user by token
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: object
	 *                    $ref: "#/components/schemas/User"
	 */
	private getAuthenticatedUser(options: APIHandlerOptions): APIHandlerResponse {
		const { user } = options;

		return {
			payload: user ?? null,
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /auth/send-update-password-link:
	 *    post:
	 *      tags:
	 *        - Authentication
	 *      description: Sends link for update password on specified email
	 *      requestBody:
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                email:
	 *                  type: string
	 *                  format: email
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  success:
	 *                    type: boolean
	 */
	private async sendUpdatePasswordLink({
		body: { email },
	}: APIHandlerOptions<{
		body: AuthSendUpdatePasswordLinkRequestDto;
	}>): Promise<APIHandlerResponse> {
		const success = await this.authService.sendUpdatePasswordLink(email);

		return {
			payload: { success },
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /auth/sign-in:
	 *    post:
	 *      tags:
	 *        - Authentication
	 *      description: Sign in user into the system
	 *      requestBody:
	 *        description: User auth data
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                email:
	 *                  type: string
	 *                  format: email
	 *                password:
	 *                  type: string
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: object
	 *                    $ref: "#/components/schemas/User"
	 */
	private async signIn(
		options: APIHandlerOptions<{
			body: UserSignInRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.authService.signIn(options.body),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /auth/sign-up:
	 *    post:
	 *      tags:
	 *        - Authentication
	 *      description: Sign up user into the system
	 *      requestBody:
	 *        description: User auth data
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                email:
	 *                  type: string
	 *                  format: email
	 *                firstName:
	 *                  type: string
	 *                lastName:
	 *                  type: string
	 *                password:
	 *                  type: string
	 *      responses:
	 *        201:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: object
	 *                    $ref: "#/components/schemas/User"
	 */
	private async signUp(
		options: APIHandlerOptions<{
			body: UserSignUpRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.authService.signUp(options.body),
			status: HTTPCode.CREATED,
		};
	}

	/**
	 * @swagger
	 * /auth/update-password:
	 *    patch:
	 *      tags:
	 *        - Authentication
	 *      description: Verifies token and updates password
	 *      requestBody:
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                token:
	 *                  type: string
	 *                password:
	 *                  type: string
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  token:
	 *                    type: string
	 *                  user:
	 *                    type: object
	 *                    $ref: "#/components/schemas/User"
	 */
	private async updatePassword({
		body: { password, token },
	}: APIHandlerOptions<{
		body: AuthUpdatePasswordRequestDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.authService.updatePassword(password, token),
			status: HTTPCode.OK,
		};
	}
}

export { AuthController };
