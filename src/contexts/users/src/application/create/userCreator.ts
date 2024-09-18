import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import CreateUserCommand from "./createUserCommand";
import Username from "../../domain/username";
import User from "../../domain/user";
import UserRepository from "../../domain/userRepository";
import UserAlreadyExistsError from "../../domain/errors/userAlreadyExistsError";

export default class UserCreator {
    private readonly repository: UserRepository;
    
    private readonly eventBus: EventBus;

    constructor(repository: UserRepository, eventBus: EventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
    }

    async run(command: CreateUserCommand): Promise<void> {
        const username = await this.repository.findByUsername(
            new Username(command.data.username)
        );

        if (username) {
            throw new UserAlreadyExistsError(
                command.data.username
            );
        }

        const newUser = User.create(command.data);

        await this.repository.create(newUser);

        await this.eventBus.publish(newUser.pullDomainEvents());
    }
}

module.exports = UserCreator;
