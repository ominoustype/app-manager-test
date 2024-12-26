import RoleRepository from "@src/domain/roleRepository";
import FindByCustomerAndNameRoleResponse from "./findByCustomerAndNameRoleResponse";
import FindByCustomerAndNameRoleQuery from "./findByCustomerAndNameRoleQuery";

export default class RoleByCustomerAndNameFinder {
    private readonly repository: RoleRepository;

    constructor(repository: RoleRepository) {
        this.repository = repository
    }

    async run(query: FindByCustomerAndNameRoleQuery): Promise<FindByCustomerAndNameRoleResponse> {
        const role = await this.repository.findByCustomerAndName(query.name, query.customerId);

        if(!role){
            throw new Error("Role not found");
        }
        
        return new FindByCustomerAndNameRoleResponse(role);
    }
}