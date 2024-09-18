import PasswordValidator from "@src/domain/password/passwordValidator";
import Password from "@src/domain/password/password";

export default class PasswordValidatorMock implements PasswordValidator {
    private mockValidate = jest.fn();

    validate(password: Password, userPassword: Password): boolean {
        return this.mockValidate(password, userPassword);
    }

    whenValidateThenReturn(isValid: boolean) {
        this.mockValidate.mockReturnValue(isValid);
    }

    ensureValidateCalledWith(password: Password, userPassword: Password) {
        expect(this.mockValidate).toHaveBeenCalledWith(password, userPassword);
    }

    ensureValidateIsNotCalled() {
        expect(this.mockValidate).not.toHaveBeenCalled();
    }
}