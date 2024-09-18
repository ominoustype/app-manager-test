import LogoutUserCommand from "./logoutUserCommand";
import Username from "../../domain/username";
import UserRepository from "../../domain/userRepository";

export default class UserLoggerOut {
    private readonly repository: UserRepository;
    
    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    async run(command: LogoutUserCommand): Promise<void> {
        return this.repository.deleteSession(new Username(command.data.username));
    }
}

module.exports = UserLoggerOut;
