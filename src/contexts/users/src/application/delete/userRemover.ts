import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import RemoveUserCommand from "./removeUserCommand";
import UserRepository from "../../domain/userRepository";
import UserByUsernameFinder from "@src/domain/userByUsernameFinder";
import logger from "@context/shared/infrastructure/logger";
import UserMissingParameterError from "@src/domain/errors/userMissingParameterError";

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
        const { data } = command;

        logger.info("Deleting user with ", { data });

        if(!data.username) {
            throw new UserMissingParameterError();
        }
        
        const user = await this.finder.find(command.data.username);

        user.delete();

        await this.repository.delete(user);

        await this.eventBus.publish(user.pullDomainEvents());
    }
}

