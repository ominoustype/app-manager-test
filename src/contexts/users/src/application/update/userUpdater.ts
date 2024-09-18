import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import UpdateUserCommand from "./updateUserCommand";
import UserRepository from "../../domain/userRepository";
import UserByUsernameFinder from "@src/domain/userByUsernameFinder";

export default class UserUpdater {
    private readonly repository: UserRepository;
    
    private readonly eventBus: EventBus;

    private readonly finder: UserByUsernameFinder;

    constructor(repository: UserRepository, eventBus: EventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
        this.finder = new UserByUsernameFinder(repository);
    }

    async run(command: UpdateUserCommand): Promise<void> {
        if (!command.data.username) {
            return;
        }
        
        const user = await this.finder.find(command.data.username);

        const updUser = user.update(command.data);

        if (!updUser) {
            return;
        }

        await this.repository.update(updUser);

        await this.eventBus.publish(updUser.pullDomainEvents());
    }
}

module.exports = UserUpdater;
