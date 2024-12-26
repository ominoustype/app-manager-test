import AuthUserQuery from "./authUserQuery";
import AuthUserResponse from "./authUserResponse";
import TokenRepository from "@src/domain/session/tokenRepository";
import Tokenator from "@src/domain/session/tokenator";

export default class UserAuth {
    private readonly tokenator: Tokenator;
    private readonly tokenRepository: TokenRepository;
    
    constructor(generator: Tokenator, tokenRepository: TokenRepository) {
        this.tokenator = generator;
        this.tokenRepository = tokenRepository;
    }

    /* 
    Three levels:

    I - Check if there is an accessToken
   II - Check that the given token is NOT blacklisted
  III - Verify the given token is valid
    */
    async run(query: AuthUserQuery): Promise<AuthUserResponse> {
        const { accessToken } = query;

        if (!accessToken) {
            throw new Error("No token!");
        }

        const cached = await this.tokenRepository.find(accessToken);

        if(cached) {
            throw new Error("Blacklisted token");
        }
        
        console.log("Auth: AccessToken OK");

        const { payload, isValid } = this.tokenator.verify(accessToken);

        if(isValid) {
            return new AuthUserResponse(payload!);
        }
        else {
            throw new Error("Invalid token");
        }
    }
}