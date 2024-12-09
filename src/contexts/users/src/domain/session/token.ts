import AggregateRoot from "@context/shared/domain/aggregateRoot";

export type TokenPrimitives = {
    token: string,
    refreshToken: string
};

export default class Token extends AggregateRoot {
    readonly token: string;
    readonly refreshToken: string;

    constructor(primitives: TokenPrimitives) {
        super();
        this.token = primitives.token;
        this.refreshToken = primitives.refreshToken;
    }

    toPrimitives(): TokenPrimitives {
        return {
            token: this.token,
            refreshToken: this.refreshToken
        }
    }

    static fromPrimitives(primitives: TokenPrimitives): Token {
        return new Token(primitives);
    }
}