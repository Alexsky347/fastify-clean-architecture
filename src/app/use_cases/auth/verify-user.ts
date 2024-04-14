import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { PasswordHash } from "../../security/bcrypt";

export const VerifyUser = async (email: string, password: string) => {
	const user = await new UserRepository().findOne(email);
	if (!user) {
		throw new Error("User not found");
	}

	const isValid = await PasswordHash.compare(password, user.password);
	if (!isValid) {
		throw new Error("Email or password is invalid");
	}

	return user;
};
