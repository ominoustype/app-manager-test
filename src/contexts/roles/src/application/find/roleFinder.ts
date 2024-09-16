import RoleRepository from "@src/domain/roleRepository";
import FindRoleQuery from "./findRoleQuery";
import FindRoleResponse from "./findRoleResponse";
import DomainRoleFinder from "@src/domain/roleFinder"

export default class RoleFinder {
    private readonly finder: DomainRoleFinder;

    constructor(repository: RoleRepository) {
        this.finder = new DomainRoleFinder(repository);
    }

    async run(query: FindRoleQuery): Promise<FindRoleResponse> {
        return new FindRoleResponse(await this.finder.find(query.id));
    }
}