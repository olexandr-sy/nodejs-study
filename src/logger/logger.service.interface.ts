export interface ILoggerService {
	logger: unknown;
	info: (...args: unknown[]) => void;
	error: (...args: unknown[]) => void;
}
