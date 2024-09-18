import ChangePasswordCommand from "./changePasswordCommand";
import UserRepository from "../../domain/userRepository";
import UserByUsernameFinder from "@src/domain/userByUsernameFinder";
import Password from "@src/domain/password/password";
import InvalidPasswordError from "@src/domain/errors/invalidPasswordError";
import PasswordGenerator from "@src/domain/password/passwordGenerator";
import PasswordValidator from "@src/domain/password/passwordValidator";

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
        const user = await this.finder.find(command.username);

        if(user.password) {
            const isValid = this.passwordValidator.validate(
                new Password(command.oldPassword),
                user.password
            );

            if (!isValid) {
                throw new InvalidPasswordError(command.username);
            }
        }

        const password = await this.passwordGenerator.generate(
            command.newPassword
        );

        const userUpdated = user.update({
            password: password.value
        });

        await this.repository.update(userUpdated);
    }
}

module.exports = PasswordChanger;
