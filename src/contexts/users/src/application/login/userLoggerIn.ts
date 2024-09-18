import UserByUsernameFinder from '@src/domain/userByUsernameFinder';
import UserRepository from '@src/domain/userRepository';
import LogInUserQuery from './loginUserQuery';
import LogInUserResponse from './loginUserResponse';
import Username from '@src/domain/username';
import TokenGenerator from '@src/domain/session/tokenGenerator';

export default class UserLoggerIn {
    private readonly repository: UserRepository;
    private readonly generator: TokenGenerator;
    private readonly finder: UserByUsernameFinder;

    constructor(repository: UserRepository, generator: TokenGenerator) {
        this.repository = repository;
        this.generator = generator;
        this.finder = new UserByUsernameFinder(repository);
    }

    async run(query: LogInUserQuery): Promise<LogInUserResponse> {
        const user = await this.finder.find(query.username);

        const session = await this.repository.getSession(
            new Username(query.username)
        );

        if (session && (await this.generator.isValid(session))) {
            return new LogInUserResponse(session, user);
        }

        const token = await this.generator.generate(user);

        await this.repository.login(user, token);

        return new LogInUserResponse(token, user);
    }
}
