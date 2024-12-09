import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import DisableUserCommand from "./disableUserCommand";
import UserRepository from "../../domain/userRepository";
import UserByUsernameFinder from "@src/domain/userByUsernameFinder";

export default class UserDisabler {
    private readonly repository: UserRepository;
    
    private readonly eventBus: EventBus;

    private readonly finder: UserByUsernameFinder;

    constructor(repository: UserRepository, eventBus: EventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
        this.finder = new UserByUsernameFinder(repository);
    }

    async run(command: DisableUserCommand): Promise<void> {
        const user = await this.finder.find(command.username);

        if (!user) {
            return;
        }

        user.disable();

        await this.repository.update(user);

        await this.eventBus.publish(user.pullDomainEvents());
    }
}

module.exports = UserDisabler;
