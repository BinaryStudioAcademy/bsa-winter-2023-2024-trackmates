import nodemailer, { type Transporter } from "nodemailer";

type Constructor = {
	senderEmail: string;
	senderName: string;
	senderPassword: string;
	service: string;
};

class Mail {
	private senderEmail: string;
	private senderName: string;

	private transporter: Transporter;

	public constructor({
		senderEmail,
		senderName,
		senderPassword,
		service,
	}: Constructor) {
		this.senderEmail = senderEmail;
		this.senderName = senderName;

		// eslint-disable-next-line  @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
		this.transporter = nodemailer.createTransport({
			auth: {
				pass: senderPassword,
				user: senderEmail,
			},
			logger: true,
			requireTLS: true,
			secure: false,
			service,
		});
	}

	public async send({
		email: to,
		subject,
		text,
	}: {
		email: string;
		subject: string;
		text: string;
	}): Promise<boolean> {
		const from = `${this.senderName} <${this.senderEmail}>`;
		// eslint-disable-next-line  @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
		await this.transporter.sendMail({ from, subject, text, to });

		return true;
	}
}

export { Mail };
