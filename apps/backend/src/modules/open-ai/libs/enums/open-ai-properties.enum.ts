const OpenAiProperties = {
	MODEL: "gpt-3.5-turbo-0125",
	RESPONSE_FORMAT: { type: "text" },
	ROLE: "user",
	TEMPERATURE: 0,
} as const;

export { OpenAiProperties };
