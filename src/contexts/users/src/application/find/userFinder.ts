import logger from '@context/shared/infrastructure/logger';
import FindUserQuery from '@src/application/find/findUserQuery';
import FindUserResponse from '@src/application/find/findUserResponse';
import UserByUsernameFinder from '@src/domain/userByUsernameFinder';
import UserRepository from '@src/domain/userRepository';

export default class UserFinder {
    private readonly finder: UserByUsernameFinder;

    constructor(repository: UserRepository) {
        this.finder = new UserByUsernameFinder(repository);
    }

    async run(query: FindUserQuery): Promise<FindUserResponse> {
        const { username } = query;

        logger.info("Finding user with ", { username  });
        
        return new FindUserResponse(await this.finder.find(username));
    }
}
