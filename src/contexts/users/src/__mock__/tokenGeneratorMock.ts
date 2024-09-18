import Token from "@src/domain/session/token";
import TokenGenerator from "@src/domain/session/tokenGenerator";
import User from "@src/domain/user";

export default class TokenGeneratorMock implements TokenGenerator {
    private mockGenerateClearToken = jest.fn();
    private mockGenerate = jest.fn();
    private mockIsValid = jest.fn();
    private mockDecode = jest.fn();

    generateClearToken() {
        return this.mockGenerateClearToken();
    }

    whenGenerateClearTokenThenReturn(token: string) {
        this.mockGenerateClearToken.mockReturnValue(token);
    }

    ensureGenerateClearTokenIsCalled() {
        expect(this.mockGenerateClearToken).toHaveBeenCalled();
    }

    generate(user: User) {
        return this.mockGenerate(user);
    }

    whenGenerateThenReturn(token: Token) {
        this.mockGenerate.mockReturnValue(token);
    }

    isValid(token: Token) {
        return this.mockIsValid(token);
    }

    whenIsValidThenReturn(isValid: boolean) {
        this.mockIsValid.mockReturnValue(isValid);
    }

    ensureIsValidCalledWith(token: Token) {
        expect(this.mockIsValid).toHaveBeenCalledWith(token);
    }

    decode(token: Token) {
        return this.mockDecode(token);
    }

    whenDecodeThenReturn(decoded: Token) {
        this.mockDecode.mockReturnValue(decoded);
    }
}