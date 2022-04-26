export class HttpError extends Error {
	code: number;
	context?: string;

	constructor(message: string, code: number, context?: string) {
		super(message);
		this.code = code;
		this.context = context;
	}
}
