import RoleNotFoundError from "./errors/roleNotFoundError";
import Role from "./role";
import RoleId from "./roleId";
import RoleRepository from "./roleRepository";

export default class RoleFinder {
    private readonly repository: RoleRepository;

    constructor(repository: RoleRepository) {
        this.repository = repository;
    }

    async find(id: string): Promise<Role> {
        const role = await this.repository.find(new RoleId(id));

        if(!role)
            throw new RoleNotFoundError(id);

        return role;
    }
}