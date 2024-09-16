import RoleRepository from "@src/domain/roleRepository";
import SearchRolesResponse from "./searchRolesResponse";
import SearchRolesQuery from "./searchRolesQuery";

export default class RolesSearcher {
    private readonly repository: RoleRepository;

    constructor(repository: RoleRepository) {
        this.repository = repository;
    }

    async run(query: SearchRolesQuery) {
        return new SearchRolesResponse(await this.repository.search(query.params));
    }
}