import Token from "@src/domain/session/token";
import TokenGenerator, { TokenPayload } from "@src/domain/session/tokenator";
import { UserPrimitives } from "@src/domain/user";
import { JwtPayload } from "jsonwebtoken";

export default class TokenGeneratorMock implements TokenGenerator {
    generateAccessToken(user: UserPrimitives): string {
        throw new Error("Method not implemented."+user);
    }
    generateRefreshToken(user: UserPrimitives): string {
        throw new Error("Method not implemented."+user);
    }
    timeToLife(token: JwtPayload): number {
        throw new Error("Method not implemented."+token);
    }

    verify(token: string): { payload: TokenPayload | null, isValid: boolean } {
        throw new Error("Method not implemented."+token);
    }

    validate(token: Token) {
        throw new Error("Method not implemented."+token);
    }
    
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

    generate(user: UserPrimitives) {
        return this.mockGenerate(user);
    }

    whenGenerateThenReturn(token: Token) {
        this.mockGenerate.mockReturnValue(token);
    }

    isValid(token: string) {
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