import User from '@src/domain/user';
import UserRepository from '@src/domain/userRepository';
import UserNotFoundError from '@src/domain/errors/userNotFoundError';
import Username from './username';

export default class UserByUsernameFinder {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async find(username: string): Promise<User> {
        const user = await this.userRepository.findByUsername(new Username(username));

        if (!user) {
            throw new UserNotFoundError(username);
        }

        return user;
    }
}
