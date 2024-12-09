import PasswordMother from "@src/domain/password/password.mother";
import ChangePasswordCommand, { ChangePasswordCommandParams } from "./changePasswordCommand";
import UsernameMother from "@src/domain/username.mother";

export default class ChangePasswordCommandMother {
    static create(params: ChangePasswordCommandParams) {
        return new ChangePasswordCommand(params);
    }

    static random(overwrites: Partial<ChangePasswordCommandParams>) {
        return ChangePasswordCommandMother.create({
            newPassword: PasswordMother.random().value,
            oldPassword: PasswordMother.random().value,
            username: UsernameMother.random().value,
            ...overwrites
        });
    }

}

