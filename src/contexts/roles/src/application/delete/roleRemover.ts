
import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import RoleFinder from "@src/domain/roleFinder";
import RoleRepository from "@src/domain/roleRepository";
import RemoveRoleCommand from "./removeRoleCommand";

export default class RoleRemover {
    private readonly repository: RoleRepository;
    private readonly eventbus: EventBus;
    private readonly finder: RoleFinder;

    constructor(repository: RoleRepository, eventbus: EventBus) {
        this.repository = repository;
        this.eventbus = eventbus;
        this.finder = new RoleFinder(repository);
    }

    async run(command: RemoveRoleCommand): Promise<void> {
        const id = command.data.id;

        if(!id)
            return;

        const role = await this.finder.find(id);

        if(role === null)
            return;

        role.delete();

        await this.repository.delete(role);

        await this.eventbus.publish(role.pullDomainEvents());
    }
}