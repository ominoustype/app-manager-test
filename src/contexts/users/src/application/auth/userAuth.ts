import logger from "@context/shared/infrastructure/logger";
import AuthUserQuery from "./authUserQuery";
import AuthUserResponse from "./authUserResponse";
import TokenRepository from "@src/domain/session/tokenRepository";
import Tokenator from "@src/domain/session/tokenator";
import UserMissingParameterError from "@src/domain/errors/userMissingParameterError";
import InvalidTokenError from "@src/domain/errors/invalidTokenError";

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

        logger.info("Authorizating user with ", { accessToken });

        if (!accessToken) {
            throw new UserMissingParameterError();
        }

        const cached = await this.tokenRepository.find(accessToken);

        if(cached) {
            logger.error("Blacklisted token", { accessToken });
            throw new InvalidTokenError(accessToken);
        }

        const { payload, isValid } = this.tokenator.verify(accessToken);

        if(isValid) {
            return new AuthUserResponse(payload!);
        }
        else {
            logger.error("Invalid token", { accessToken });
            throw new InvalidTokenError(accessToken);
        }
    }
}