import EnvironmentRepository from "@src/domain/environmentRepository";
import CreateEnvironmentCommand from "./createEnvironmentCommand";
import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import EnvironmentAlreadyExistsError from "@src/domain/errors/environmentAlreadyExistsError";
import Environment from "@src/domain/environment";
import { QueryBus } from "@context/shared/domain/queryBus/queryBus";
import FindUserQuery from "@context/users/application/find/findUserQuery";
import FindUserResponse from "@context/users/application/find/findUserResponse";
import FindRoleQuery from "@context/roles/application/find/findRoleQuery";
import FindRoleResponse from "@context/roles/application/find/findRoleResponse";
import { CommandBus } from "@context/shared/domain/commandBus/commandBus";
import UpdateRoleCommand from "@context/roles/application/update/updateRoleCommand";
import { RolePrimitives } from "@context/roles/domain/role";
import FindByCustomerAndNameRoleQuery from "@context/roles/application/findByCustomerAndName/findByCustomerAndNameRoleQuery";
import FindByCustomerAndNameRoleResponse from "@context/roles/application/findByCustomerAndName/findByCustomerAndNameRoleResponse";
import LogoutUserCommand from "@context/users/application/logout/logoutUserCommand";

export default class EnvironmentCreator {
    private readonly repository: EnvironmentRepository;

    private readonly eventBus: EventBus;

    private readonly queryBus: QueryBus;

    private readonly commandBus: CommandBus;

    constructor(repository: EnvironmentRepository, eventBus: EventBus, queryBus: QueryBus, commandBus: CommandBus) {
        this.repository = repository;
        this.eventBus = eventBus;
        this.queryBus = queryBus;
        this.commandBus = commandBus;
    }

    /*
        1 - Find User
        2 - Find Role
        3 - Check privileges
        4 - Create Environment
        5 - Update own Role
        6 - Find&Update the other Role
        7 - Invalidate AccessToken
    */
    async run(command: CreateEnvironmentCommand): Promise<void> {
        const { data, permissions } = command;
//1
        const user = await this.queryBus.ask(
            new FindUserQuery({
                username: permissions.username
            })
        ) as FindUserResponse;

        if(!user?.primitives) {
            return;
        }
//2
        const role = await this.queryBus.ask(
            new FindRoleQuery({
                id: user.primitives.role.id
            })
        ) as FindRoleResponse;

//3&4
        if(role.primitives.customerId != data.customer.id && role.primitives.name != 'ADMIN') {
            return;
        }

        const newEnvironment = Environment.create(command.data);

        const environment = await this.repository.find(newEnvironment.id);

        if(environment !== null)
            throw new EnvironmentAlreadyExistsError(newEnvironment.id.value);

        await this.repository.create(newEnvironment);
        await this.eventBus.publish(newEnvironment.pullDomainEvents());

//5
        await this.updateRole(role.primitives, newEnvironment.id.value);

//6
        if(role.primitives.name == 'ADMIN') {
            await this.findAndUpdateRole(data.customer.id, newEnvironment.id.value, "MANAGER");
        }
        else {
            /* Find the ADMIN user, find its role, and finally update it with the new environmentId */
            const adminUser = await this.queryBus.ask(
                new FindUserQuery({
                    username: 'admin'
                })
            ) as FindUserResponse;
    
            const adminRole = await this.queryBus.ask(
                new FindRoleQuery({
                    id: adminUser.primitives.role.id
                })
            ) as FindRoleResponse;

            await this.updateRole(adminRole.primitives, newEnvironment.id.value);
        }
//7
        await this.commandBus.dispatch(
            new LogoutUserCommand({
                username: user.primitives.username,
                accessToken: permissions.accessToken,
                refreshToken: ""
            })
        );
    }

    async updateRole(primitives: RolePrimitives, environmentId: string) {
        await this.commandBus.dispatch(
            new UpdateRoleCommand({
                ...primitives,
                environments: primitives.environments.concat({ 
                    id: environmentId
                })
            })
        );
    }

    async findAndUpdateRole(customerId: string, environmentId: string, roleName: string) {

        const role = await this.queryBus.ask(
            new FindByCustomerAndNameRoleQuery({
                name: roleName,
                customerId: customerId
            })
        ) as FindByCustomerAndNameRoleResponse;

        this.updateRole(role.primitives, environmentId);
    }
}