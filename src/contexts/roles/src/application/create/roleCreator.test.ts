import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import RoleRepositoryMock from "@src/__mock__/roleRepository";
import RoleCreator from "./roleCreator";
import RoleAlreadyExistsError from "@src/domain/errors/roleAlreadyExistError";
import CreateRoleQueryHandler from "./createRoleQueryHandler";
import CreateRoleQueryMother from "./createRoleQuery.mother";

describe('roleCreator', () => {
    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new RoleRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new CreateRoleQueryHandler(
                new RoleCreator(repository, eventBus)
            ),

            query = CreateRoleQueryMother.random(),
            role = CreateRoleQueryMother.applyQuery(query);

        repository.whenFindThenReturn(null);

        await handler.handle(query);

        repository.assertCreateHasBeenCalledWith(role, ['id']);
    });

    it('should throw a RoleAlreadyExistsError', async () => {
        expect.hasAssertions();

        const repository = new RoleRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new CreateRoleQueryHandler(
                new RoleCreator(repository, eventBus)
            ),
        query = CreateRoleQueryMother.random(),
        role = CreateRoleQueryMother.applyQuery(query);

        repository.whenFindThenReturn(role)

        try{
            await handler.handle(query);
        }
        catch(e){
            expect(e).toBeInstanceOf(RoleAlreadyExistsError)
        }
    });

    it('should publish a NewRoleCreatedDomainEvent', async () => {

    });
});