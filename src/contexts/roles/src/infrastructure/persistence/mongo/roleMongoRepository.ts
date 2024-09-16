import Cursor from '@context/shared/domain/criteria/cursor';
import { Nullable } from '@context/shared/domain/nullable';
import MongoRepository from '@context/shared/infrastructure/mongo/mongoRepository';
import { SearchRolesQueryParams } from '@src/application/search/searchRolesQuery';
import Role from '@src/domain/role';
import RoleId from '@src/domain/roleId';
import RoleRepository from '@src/domain/roleRepository';
import Roles from '@src/domain/roles';

const DEFAULT_PAGE_SIZE = 50;

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

        const role = collection.find(find, { limit: DEFAULT_PAGE_SIZE });
        const items = (await role.toArray()).map((role) => 
            this.getParsed(role)
        );
       
        return new Roles(
            items.length <= 0 ? [] : items.map((i) => i.toPrimitives())
        );
    }

    async dropCollection() {
        (await this.collection()).drop();
    }

    getParsed(role: any): Role{
        return role.fromPrimitives({
            ...role,
            id: role._id
        });
    }
}