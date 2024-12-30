import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import DisableUserCommand from "./disableUserCommand";
import UserRepository from "../../domain/userRepository";
import UserByUsernameFinder from "@src/domain/userByUsernameFinder";
import logger from "@context/shared/infrastructure/logger";
import UserMissingParameterError from "@src/domain/errors/userMissingParameterError";

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
        const { username } = command;

        logger.info("Disabling user with ", { username });

        if(username) {
            throw new UserMissingParameterError();
        }

        const user = await this.finder.find(command.username);

        user.disable();

        await this.repository.update(user);

        await this.eventBus.publish(user.pullDomainEvents());
    }
}
