import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import UpdateUserCommand from "./updateUserCommand";
import UserRepository from "../../domain/userRepository";
import UserByUsernameFinder from "@src/domain/userByUsernameFinder";
import { QueryBus } from "@context/shared/domain/queryBus/queryBus";
import { CommandBus } from "@context/shared/domain/commandBus/commandBus";
import UpdateRoleCommand from "@context/roles/application/update/updateRoleCommand";
import FindRoleQuery from "@context/roles/application/find/findRoleQuery";
import FindRoleResponse from "@context/roles/application/find/findRoleResponse";
import UserMissingParameterError from "@src/domain/errors/userMissingParameterError";
import logger from "@context/shared/infrastructure/logger";

export default class UserUpdater {
    private readonly repository: UserRepository;
    
    private readonly eventBus: EventBus;

    private readonly finder: UserByUsernameFinder;

    private readonly queryBus: QueryBus;

    private readonly commandBus: CommandBus;

    constructor(repository: UserRepository, eventBus: EventBus, queryBus: QueryBus, commandBus: CommandBus) {
        this.repository = repository;
        this.eventBus = eventBus;
        this.finder = new UserByUsernameFinder(repository);
        this.queryBus = queryBus;
        this.commandBus = commandBus;
    }

    async run(command: UpdateUserCommand): Promise<void> {
        const { 
            user: userPrimitives, 
            role: rolePrimitives, 
            username: username
        } = command.data;

        logger.info("Updating user&role with ", { username });

        if (!username) {
           throw new UserMissingParameterError();
        }
        
        const user = await this.finder.find(username);

        const updUser = user.update(userPrimitives);

        /* Find Role */
        await this.queryBus.ask(
            new FindRoleQuery({
                 id: user.role?.id.value 
            })
        ) as FindRoleResponse;

        await this.repository.update(updUser);

        await this.eventBus.publish(updUser.pullDomainEvents());

        /* Update Role */
        await this.commandBus.dispatch(
            new UpdateRoleCommand({
                ...rolePrimitives
            }
        ));
    }
}