import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import RoleFinder from "@src/domain/roleFinder";
import RoleRepository from "@src/domain/roleRepository";
import UpdateRoleCommand from "./updateRoleCommand";
import RoleNotFoundError from "@src/domain/errors/roleNotFoundError";

export default class RoleUpdater {
    private readonly repository: RoleRepository;
    private readonly eventBus: EventBus;
    private readonly finder: RoleFinder;

    constructor(repository: RoleRepository, eventBus: EventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
        this.finder = new RoleFinder(this.repository);
    }

    async run(command: UpdateRoleCommand): Promise<void> {
        const id = command.data.id;

        if(!id)
            return;

        const role = await this.finder.find(id);

        if(role === null)
            throw new RoleNotFoundError(id);

        const newRole = role.update(command.data);

        await this.repository.update(newRole);

        await this.eventBus.publish(newRole.pullDomainEvents());
    }
}