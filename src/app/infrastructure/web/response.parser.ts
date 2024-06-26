import {
	ErrorInterface,
	ResponseInterface,
	SuccessInterface,
} from "../../domain/interface/response.interface";

const setFormatError = (code: number, message: string): ErrorInterface => {
	return {
		error: {
			code: code,
			message: message,
		},
	} as ErrorInterface;
};

const setFormatSuccess = (code: number, message: string): SuccessInterface => {
	return {
		success: {
			code: code,
			message: message,
		},
	} as SuccessInterface;
};

export const parseResponse = (data: ResponseInterface) => {
	if (data.constructor === Error) {
		// Check data is instance of Error?
		// Error => `Error: 400 : Invalid input, Please input field: id, country`
		const errorSplitted = data.toString().split(": "); // ['Error', code , error-msg]
		const errorCode = parseInt(errorSplitted?.[1] as string, 10);
		const errorMessage = `${errorSplitted[1]}: ${errorSplitted[2]}`;
		return setFormatError(errorCode, errorMessage);
	} else if (typeof data === "string") {
		// Check data is string type (msg from success from usecase)
		// Success with message => ` "200 : Page already exists in database, country : TH"`
		const successCode = parseInt(
			data?.toString()?.split(":")?.[0] as string,
			10,
		);
		const successMessage = data;
		return setFormatSuccess(successCode, successMessage);
	} else {
		return data;
	}
};
