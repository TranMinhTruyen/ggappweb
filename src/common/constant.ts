export enum ErrorType {
	VALID = 'valid',
	REQUIRED = 'required',
	MAXLENGTH = 'maxLength',
	MINLENGTH = 'minLength',
	MIN = 'min',
	MAX = 'max',
}
type ErrorItem = {
	type: ErrorType;
	message: string;
}
export const Error: ErrorItem[] = [
	{ type: ErrorType.REQUIRED, message: 'This is require!' },
	{ type: ErrorType.MAXLENGTH, message: 'Max lenght is: ' },
	{ type: ErrorType.MINLENGTH, message: 'Min lenght is: ' },
	{ type: ErrorType.MIN, message: 'Min is: ' },
	{ type: ErrorType.MAX, message: 'Max is: ' },
]