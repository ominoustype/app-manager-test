import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import RemoveUserCommand from "./removeUserCommand";
import UserRepository from "../../domain/userRepository";
import UserByUsernameFinder from "@src/domain/userByUsernameFinder";

export default class UserRemover {
    private readonly repository: UserRepository;
    
    private readonly eventBus: EventBus;

    private readonly finder: UserByUsernameFinder;

    constructor(repository: UserRepository, eventBus: EventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
        this.finder = new UserByUsernameFinder(repository);
    }

    async run(command: RemoveUserCommand): Promise<void> {
        const user = await this.finder.find(command.data.username);

        user.delete();

        await this.repository.delete(user);

        await this.eventBus.publish(user.pullDomainEvents());
    }
}

module.exports = UserRemover;
