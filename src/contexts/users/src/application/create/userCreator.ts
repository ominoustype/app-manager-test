import RemoveRoleCommand from '@context/roles/application/delete/removeRoleCommand';
import { CommandBus } from '@context/shared/domain/commandBus/commandBus';
import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import CreateUserCommand from "./createUserCommand";
import Username from "../../domain/username";
import User from "../../domain/user";
import UserRepository from "../../domain/userRepository";
import UserAlreadyExistsError from "../../domain/errors/userAlreadyExistsError";
import { QueryBus } from "@context/shared/domain/queryBus/queryBus";
import RoleName from '@src/domain/role/roleName';
import CreateRoleQuery from '@context/roles/application/create/createRoleQuery';
import CreateRoleResponse from '@context/roles/application/create/createRoleResponse';
import UserNotFoundError from '@src/domain/errors/userNotFoundError';

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
        const { 
            user: userPrimitives, 
            role: rolePrimitives
        } = command.data;

        //this.checkPrivileges(rolePrimitives.name, username);

        /* If the User already exists -> finish */
        const user = await this.repository.findByUsername(
            new Username(userPrimitives.username)
        );

        if (user) {
            throw new UserAlreadyExistsError(
                userPrimitives.username
            );
        }

        /* Create Role first */
        const roleResponse = await this.queryBus.ask(
            new CreateRoleQuery({
                ...rolePrimitives
        })) as CreateRoleResponse;

        if(!roleResponse?.primitives)
            throw new Error("Role not received after creation");

        const newRole = roleResponse.primitives;

        try {
            /* Create User */
            const newUser = User.create({
               ...userPrimitives,
               role: {
                id: newRole.id, 
                name: newRole.name as RoleName
            }});

            await this.repository.create(newUser);
        
            await this.eventBus.publish(newUser.pullDomainEvents());
        }
        catch(e) {
            /* If create User fails -> remove the Role just created */
            await this.removeRole(newRole.id);
            throw new Error("User creation has failed obstreperously");
        }
    }

    /* Remove Role in case it is an orphan */
    async removeRole(roleId: string) {
        const user = await this.repository.findByRole(roleId);
        if(!user) {
            await this.commandBus.dispatch(
                new RemoveRoleCommand({
                    id: roleId
            }));
        }
    }

    async checkPrivileges(role: string, username: string) {
        const user = await this.repository.findByUsername(
            new Username(username)
        );

        if (!user) {
            throw new UserNotFoundError(username);
        }

        const userRoleName = user.role.name;

        if(role === RoleName.ROOT)
            return;

        if(role === RoleName.MANAGER && userRoleName !== RoleName.ROOT)
            return;
    }
}
