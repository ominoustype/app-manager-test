
import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import RoleFinder from "@src/domain/roleFinder";
import RoleRepository from "@src/domain/roleRepository";
import RemoveRoleCommand from "./removeRoleCommand";
import logger from "@context/shared/infrastructure/logger";
import RoleNotFoundError from "@src/domain/errors/roleNotFoundError";
import RoleMissingParameterError from "@src/domain/errors/roleMissingParameterError";

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
        const { id } = command.data;

        logger.info("Deleting role with ", { id });

        if(!id) {
            throw new RoleMissingParameterError();
        }

        const role = await this.finder.find(id);

        if(!role) {
            throw new RoleNotFoundError(id);
        }

        role.delete();

        await this.repository.delete(role);

        await this.eventbus.publish(role.pullDomainEvents());
    }
}