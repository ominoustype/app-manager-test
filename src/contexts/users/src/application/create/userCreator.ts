import RemoveRoleCommand from '@context/roles/application/delete/removeRoleCommand';
import { CommandBus } from '@context/shared/domain/commandBus/commandBus';
import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import CreateUserCommand from "./createUserCommand";
import Username from "../../domain/username";
import User from "../../domain/user";
import UserRepository from "../../domain/userRepository";
import UserAlreadyExistsError from "../../domain/errors/userAlreadyExistsError";
import { QueryBus } from "@context/shared/domain/queryBus/queryBus";
import FindRoleQuery from "@context/roles/application/find/findRoleQuery";

export default class UserCreator {
    private readonly repository: UserRepository;
    
    private readonly eventBus: EventBus;

    private readonly queryBus: QueryBus;

    private readonly commandBus: CommandBus;

    constructor(repository: UserRepository, eventBus: EventBus, queryBus: QueryBus, commandBus: CommandBus) {
        this.repository = repository;
        this.eventBus = eventBus;
        this.queryBus = queryBus;
        this.commandBus = commandBus;
    }

    async run(command: CreateUserCommand): Promise<void> {
        const { userPrimitives, roleId } = command.data;

        const role = await this.queryBus.ask(
            new FindRoleQuery({ 
                id: roleId 
            }
        ));

        if(!role) {
            return;
        }

        const username = await this.repository.findByUsername(
            new Username(userPrimitives.username)
        );

        if (username) {
            throw new UserAlreadyExistsError(
                userPrimitives.username
            );
        }

        try {
            const newUser = User.create(userPrimitives);

            await this.repository.create(newUser);
        
            await this.eventBus.publish(newUser.pullDomainEvents());
        }
        catch {
            this.removeRole(roleId);
            return;
        }
    }

    /* Remove Role in case it is an orphan */
    async removeRole(roleId: string) {
        const user = await this.repository.findByRole(roleId);
        if(!user) {
            this.commandBus.dispatch(
                new RemoveRoleCommand({
                    id: roleId
            }));
        }
    }
}
