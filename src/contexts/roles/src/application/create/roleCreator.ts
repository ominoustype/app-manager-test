import RoleRepository from "@src/domain/roleRepository";
import CreateRoleCommand from "./createRoleQuery";
import Role from "@src/domain/role";
import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import RoleAlreadyExistsError from "@src/domain/errors/roleAlreadyExistError";
import CreateRoleResponse from "./createRoleResponse";

export default class RoleCreator {
    private readonly repository: RoleRepository;
    private readonly eventbus: EventBus;

    constructor(repository: RoleRepository, eventbus: EventBus) {
        this.repository = repository;
        this.eventbus = eventbus;
    }

    async run(command: CreateRoleCommand): Promise<CreateRoleResponse> {
        const newRole = Role.create(command.data);

        const role = await this.repository.find(newRole.id);

        if(role !== null)
            throw new RoleAlreadyExistsError(newRole.id.value);

        await this.repository.create(newRole);

        await this.eventbus.publish(newRole.pullDomainEvents());

        return new CreateRoleResponse(newRole);
    }
}