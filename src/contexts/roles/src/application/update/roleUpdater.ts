import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import RoleFinder from "@src/domain/roleFinder";
import RoleRepository from "@src/domain/roleRepository";
import UpdateRoleCommand from "./updateRoleCommand";
import RoleNotFoundError from "@src/domain/errors/roleNotFoundError";
import RoleMissingParameterError from "@src/domain/errors/roleMissingParameterError";
import logger from "@context/shared/infrastructure/logger";

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
        const { data } = command;

        logger.info("Updating role with ", { data });

        if(!data.id) {
            throw new RoleMissingParameterError();
        }
        
        const role = await this.finder.find(data.id);

        if(!role) {
            throw new RoleNotFoundError(data.id);
        }

        const newRole = role.update(data);

        await this.repository.update(newRole);

        await this.eventBus.publish(newRole.pullDomainEvents());
    }
}