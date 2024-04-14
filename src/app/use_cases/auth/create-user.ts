import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { PasswordHash } from "../../security/bcrypt";

export const CreateUser = async (
	email: string,
	phone_no: string,
	password: string,
) => {
	password = await PasswordHash.hash(password);
	return new UserRepository().save({
		email,
		phone_no,
		password,
	});
};
