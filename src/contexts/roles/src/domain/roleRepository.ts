import { Nullable } from "@context/shared/domain/nullable";
import Role from "./role";
import RoleId from "./roleId";
import { SearchRolesQueryParams } from "@src/application/search/searchRolesQuery";
import Roles from "./roles";

export default interface RoleRepository {
    find(id: RoleId): Promise<Nullable<Role>>;

    findByCustomerAndName(name: string, customerId: string):  Promise<Nullable<Role>>;

    create(role: Role): Promise<void>;

    delete(role: Role): Promise<void>;

    update(role: Role): Promise<void>;

    search(params: SearchRolesQueryParams): Promise<Roles>;
}