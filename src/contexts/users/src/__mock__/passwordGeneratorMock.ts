import PasswordGenerator from "@src/domain/password/passwordGenerator";
import Password from "@src/domain/password/password";

export default class PasswordGeneratorMock implements PasswordGenerator {
    private mockGenerateClearPassword = jest.fn();
    private mockGenerate = jest.fn();

    generateClearPassword(): string {
        return this.mockGenerateClearPassword();
    }

    whenGenerateClearPasswordThenReturn(password: string) {
        this.mockGenerateClearPassword.mockReturnValue(password);
    }

    ensureGenerateClearPasswordIsCalled() {
        expect(this.mockGenerateClearPassword).toHaveBeenCalled();
    }

    generate(password: string) {
        return this.mockGenerate(password);
    }

    whenGenerateThenReturn(password: Password) {
        this.mockGenerate.mockReturnValue(password);
    }

    ensureGenerateIsCalledWith(password: Password) {
        expect(this.mockGenerate).toHaveBeenCalledWith(password);
    }
}