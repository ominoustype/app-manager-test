import ChangePasswordCommand from "./changePasswordCommand";
import UserRepository from "../../domain/userRepository";
import UserByUsernameFinder from "@src/domain/userByUsernameFinder";
import Password from "@src/domain/password/password";
import InvalidPasswordError from "@src/domain/errors/invalidPasswordError";
import PasswordGenerator from "@src/domain/password/passwordGenerator";
import PasswordValidator from "@src/domain/password/passwordValidator";
import logger from "@context/shared/infrastructure/logger";

export default class PasswordChanger {
    private readonly repository: UserRepository;
    private readonly passwordGenerator: PasswordGenerator;
    private readonly passwordValidator: PasswordValidator;
    private readonly finder: UserByUsernameFinder;

    constructor(repository: UserRepository, passwordGenerator: PasswordGenerator, passwordValidator: PasswordValidator) {
        this.repository = repository;
        this.passwordGenerator = passwordGenerator;
        this.passwordValidator = passwordValidator;
        this.finder = new UserByUsernameFinder(repository);
    }

    async run(command: ChangePasswordCommand): Promise<void> {
        const { username, oldPassword, newPassword } = command;

        logger.info("Changing password to user with ", { username });

        const user = await this.finder.find(username);

        if(user.password) {
            const isValid = this.passwordValidator.validate(
                new Password(oldPassword),
                user.password
            );

            if (!isValid) {
                throw new InvalidPasswordError(username);
            }
        }

        const password = this.passwordGenerator.generate(newPassword);

        const userUpdated = user.update({
            password: password.value
        });

        await this.repository.update(userUpdated);
    }
}
