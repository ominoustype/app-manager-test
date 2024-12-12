import { RolePrimitives } from "@context/roles/domain/role";
import Token from "@src/domain/session/token";
import Tokenator, { TokenPayload } from "@src/domain/session/tokenator";
import { UserPrimitives } from "@src/domain/user";
import { JwtPayload } from "jsonwebtoken";

export default class TokenatorMock implements Tokenator {
    private mockGenerateAccessToken = jest.fn();
    private mockGenerateRefreshToken = jest.fn();
    private mockIsValid = jest.fn();
    private mockVerify = jest.fn();

    generateAccessToken(user: UserPrimitives, role: RolePrimitives): string {
        return this.mockGenerateAccessToken(user, role);
    }

    generateRefreshToken(user: UserPrimitives): string {
        return this.mockGenerateRefreshToken(user);
    }

    whenGenerateAccessThenReturn(token: string) {
        this.mockGenerateAccessToken.mockReturnValue(token);
    }

    whenGenerateRefreshThenReturn(token: string) {
        this.mockGenerateRefreshToken.mockReturnValue(token);
    }

    isValid(token: string) {
        return this.mockIsValid(token);
    }

    verify(token: string): { payload: TokenPayload | null; isValid: boolean; } {
        return this.mockVerify(token);
    }

    whenIsValidThenReturn(isValid: boolean) {
        this.mockIsValid.mockReturnValue(isValid);
    }

    ensureIsValidCalledWith(token: Token) {
        expect(this.mockIsValid).toHaveBeenCalledWith(token);
    }

    timeToLife(token: JwtPayload): number {
        throw new Error("Method not implemented."+token);
    }
}