import RoleRepository from "@src/domain/roleRepository";
import FindByCustomerAndNameRoleResponse from "./findByCustomerAndNameRoleResponse";
import FindByCustomerAndNameRoleQuery from "./findByCustomerAndNameRoleQuery";
import RoleByCustomerAndNameNotFoundError from "@src/domain/errors/roleByCustomerAndNameNotFoundError";
import RoleMissingParameterError from "@src/domain/errors/roleMissingParameterError";

export default class RoleByCustomerAndNameFinder {
    private readonly repository: RoleRepository;

    constructor(repository: RoleRepository) {
        this.repository = repository
    }

    async run(query: FindByCustomerAndNameRoleQuery): Promise<FindByCustomerAndNameRoleResponse> {
        const { name, customerId } = query;

        if(!name || !customerId) {
            throw new RoleMissingParameterError();
        }

        const role = await this.repository.findByCustomerAndName(name, customerId);

        if(!role) {
            throw new RoleByCustomerAndNameNotFoundError(customerId, name);
        }
        
        return new FindByCustomerAndNameRoleResponse(role);
    }
}