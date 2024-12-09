import UserRepositoryMock from "@src/__mock__/userRepositoryMock";
import ChangePasswordCommandHandler from "./changePasswordCommandHandler";
import PasswordChanger from "./passwordChanger";
import UserMother from "@src/domain/user.mother";
import ChangePasswordCommandMother from "./changePasswordCommand.mother";
import PasswordValidatorMock from "@src/__mock__/passwordValidatorMock";
import PasswordGeneratorMock from "@src/__mock__/passwordGeneratorMock";
import PasswordMother from "@src/domain/password/password.mother";

describe('passwordChanger', () => {
    it('should call the repository with the username', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            generator = new PasswordGeneratorMock(),
            validator = new PasswordValidatorMock(),
            handler = new ChangePasswordCommandHandler(
                new PasswordChanger(repository, generator, validator)
            ),
            user = UserMother.random(),
            newPassword = PasswordMother.random(),
            command = ChangePasswordCommandMother.create({
                username: user.username.toString(),
                oldPassword: user.password!.toString(),
                newPassword: newPassword.toString()
            });

        repository.whenFindByUsernameThenReturn(user);
        validator.whenValidateThenReturn(true);
        generator.whenGenerateThenReturn(newPassword);

        await handler.handle(command);

        repository.assertFindByUsernameHasBeenCalledWith(user.username);
    });
    
    it.skip('should change the password', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            generator = new PasswordGeneratorMock(),
            validator = new PasswordValidatorMock(),
            handler = new ChangePasswordCommandHandler(
                new PasswordChanger(repository, generator, validator)
            ),
            user = UserMother.random(),
            newPassword = PasswordMother.random(),
            command = ChangePasswordCommandMother.create({
                username: user.username.toString(),
                oldPassword: user.password!.toString(),
                newPassword: newPassword.toString()
            }),
            expected = UserMother.random({
                ...user.toPrimitives(),
                password: newPassword.toString()
            });

        repository.whenFindByUsernameThenReturn(user);
        validator.whenValidateThenReturn(true);
        generator.whenGenerateThenReturn(newPassword);

        await handler.handle(command);

        repository.assertUpdateHasBeenCalledWith(expected);
    });
});
