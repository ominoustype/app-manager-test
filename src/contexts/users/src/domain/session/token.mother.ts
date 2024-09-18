import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Token, { TokenPrimitives } from "./token";

export default class TokenMother {
    static create(token: TokenPrimitives): Token {
        return new Token(token);
    }

    static random(): Token {
        return TokenMother.create({
            token: MotherCreator.word(),
            refreshToken: MotherCreator.word()
        });
    }
}