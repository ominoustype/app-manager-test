import Cursor from '@context/shared/domain/criteria/cursor';
import { Nullable } from '@context/shared/domain/nullable';
import MongoRepository from '@context/shared/infrastructure/mongo/mongoRepository';
import { SearchRolesQueryParams } from '@src/application/search/searchRolesQuery';
import Role from '@src/domain/role';
import RoleId from '@src/domain/roleId';
import RoleRepository from '@src/domain/roleRepository';
import Roles, { RolesPrimitives } from '@src/domain/roles';

const DEFAULT_PAGE_SIZE = 50;

const PROJECTION = {
    id: "$_id",
    _id: 0,
    name: 1,
    customerId: 1,
    environmentIds: 1
};

export default class RoleMongoRepository extends MongoRepository<Role> implements RoleRepository {
    protected moduleName(): string {
        return 'role';
    }
    protected getCursor(item: Role, isBackward: boolean): Cursor {
        return Cursor.fromObject({
            _id: item.id.toString(), 
            isBackward 
        });
    }

    async find(id: RoleId): Promise<Nullable<Role>> {
        return this.byId(id.value, Role.fromPrimitives);
    }

    async create(role: Role): Promise<void>{
        await this.persist(role.id.value, role);
    }

    async delete(role: Role): Promise<void> {
        await this.remove(role.id.value);
    }

    async update(role: Role): Promise<void> {
        await this.persist(role.id.value, role);
    }

    async search(params: SearchRolesQueryParams): Promise<Roles> {
        let find = {};
        console.log(params); 

        const collection = (await this.collection());
        
        const roles = collection.find(find, { limit: DEFAULT_PAGE_SIZE, projection: PROJECTION });
        const items = (await roles.toArray()) as unknown as RolesPrimitives;

        return new Roles(items);
    }

    async dropCollection() {
        (await this.collection()).drop();
    }
}