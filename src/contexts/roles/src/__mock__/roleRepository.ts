import { Nullable } from '@context/shared/domain/nullable';
import Uuid from '@context/shared/domain/uuid';
import { SearchRolesQueryParams } from '@src/application/search/searchRolesQuery';
import Role from '@src/domain/role';
import RoleRepository from '@src/domain/roleRepository';
import Roles from '@src/domain/roles';
import { omit } from 'lodash';

export default class RoleRepositoryMock implements RoleRepository {
    private mockFind = jest.fn();
    private mockCreate = jest.fn();
    private mockDelete = jest.fn();
    private mockUpdate = jest.fn();
    private mockSearch = jest.fn();

    async find(id: Uuid): Promise<Nullable<Role>> {
        return this.mockFind(id);
    }

    create(role: Role) {
        return this.mockCreate(role);
    }

    delete(role: Role): Promise<void> {
        return this.mockDelete(role);
    }

    update(id: any) {
        return this.mockUpdate(id);
    }

    search(params: SearchRolesQueryParams): Promise<Roles> {
        return this.mockSearch(params);
    }

    async whenFindThenReturn(role: Nullable<Role>): Promise<void> {
        this.mockFind.mockReturnValue(Promise.resolve(role));
    }

    async whenSearchThenReturn(roles: Roles): Promise<void> {
        this.mockSearch.mockReturnValue(roles);
    }

    async assertFindHasBeenCalledWith(id: Uuid): Promise<void> {
        expect(this.mockFind).toHaveBeenCalledWith(id);
    }

    assertCreateHasBeenCalledWith(role: Role, exclusions: Array<string>) {
        const { mock } = this.mockCreate,
            lastRoleCreated = mock.calls[mock.calls.length - 1][0],
            lastRoleCreatedPrimitives = omit(
                lastRoleCreated.toPrimitives(),
                exclusions ?? []
            ),
            expectedBody = omit(role.toPrimitives(), exclusions ?? []);

        expect(lastRoleCreatedPrimitives).toStrictEqual(expectedBody);
    }

    async assertDeleteHasBeenCalledWith(role: Role): Promise<void> {
        expect(this.mockDelete).toHaveBeenCalledWith(role);
    }

    async assertUpdateHasBeenCalledWith(role: Role): Promise<void> {
        expect(this.mockUpdate).toHaveBeenCalledWith(role);
    }

    assertSearchHasBeenCalledWith(params: SearchRolesQueryParams) {
        expect(this.mockSearch).toHaveBeenCalledWith(params);
    }
}