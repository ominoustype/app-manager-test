/*import RoleRepositoryMock from "@src/__mock__/roleRepository";
import FindRoleQueryHandler from "./findByCustomerAndNameRoleQueryHandler";
import RoleFinder from "./roleByCustomerAndNameFinder";
import FindRoleQueryMother from "./findByCustomerAndNameQuery.mother";
import Uuid from "@context/shared/domain/uuid";
import FindRoleResponseMother from "./findByCustomerAndNameRoleResponse.mother";
import RoleNotFoundError from "@src/domain/errors/roleNotFoundError";
import MotherCreator from "@context/shared/domain/motherCreator.mother";

describe('roleFinder', () => {
    it('should call the repository with an id', async () => {
        expect.hasAssertions();

        const repository = new RoleRepositoryMock(),
            handler = new FindRoleQueryHandler(
                new RoleFinder(repository)
            ),
        
            query = FindRoleQueryMother.random(),
            role = FindRoleQueryMother.randomRole(query);

        repository.whenFindThenReturn(role);

        await handler.handle(query);

        repository.assertFindHasBeenCalledWith(new Uuid(query.id))
    });

    it('should find a role', async () => {
        expect.hasAssertions();

        const repository = new RoleRepositoryMock(),
            handler = new FindRoleQueryHandler(
                new RoleFinder(repository)
        ),

            query = FindRoleQueryMother.random(),
            role = FindRoleQueryMother.randomRole(query),
            expected = FindRoleResponseMother.create(role.toPrimitives());

        repository.whenFindThenReturn(role);

        const response = await handler.handle(query);
    
        expect(response).toStrictEqual(expected);
    });

    it('should throw a RoleNotFoundError when the role does not exist', async () => {
        expect.hasAssertions();

        const repository = new RoleRepositoryMock(),
        handler = new FindRoleQueryHandler(
            new RoleFinder(repository)
        ),

        query = FindRoleQueryMother.random();

        repository.whenFindThenReturn(null);

        try{
            await handler.handle(query);
        }
        catch(e){
            expect(e).toBeInstanceOf(RoleNotFoundError);
        }
    })
});

*/