import RoleRepository from "@src/domain/roleRepository";
import FindRoleQuery from "./findRoleQuery";
import FindRoleResponse from "./findRoleResponse";
import DomainRoleFinder from "@src/domain/roleFinder"
import logger from "@context/shared/infrastructure/logger";

export default class RoleFinder {
    private readonly finder: DomainRoleFinder;

    constructor(repository: RoleRepository) {
        this.finder = new DomainRoleFinder(repository);
    }

    async run(query: FindRoleQuery): Promise<FindRoleResponse> {
        const { id } = query;

        logger.info("Finding role with ", { id });

        return new FindRoleResponse(await this.finder.find(query.id));
    }
}