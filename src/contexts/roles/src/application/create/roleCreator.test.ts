import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import RoleRepositoryMock from "@src/__mock__/roleRepository";
import CreateRoleCommandHandler from "./createRoleCommandHandler";
import RoleCreator from "./roleCreator";
import CreateRoleCommandMother from "./createRoleCommand.mother";
import RoleAlreadyExistsError from "@src/domain/errors/roleAlreadyExistError";

describe('roleCreator', () => {
    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new RoleRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new CreateRoleCommandHandler(
                new RoleCreator(repository, eventBus)
            ),

            command = CreateRoleCommandMother.random(),
            role = CreateRoleCommandMother.applyCommand(command);

        repository.whenFindThenReturn(null);

        await handler.handle(command);

        repository.assertCreateHasBeenCalledWith(role, ['id']);
    });

    it('should throw a RoleAlreadyExistsError', async () => {
        expect.hasAssertions();

        const repository = new RoleRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new CreateRoleCommandHandler(
                new RoleCreator(repository, eventBus)
            ),
        command = CreateRoleCommandMother.random(),
        role = CreateRoleCommandMother.applyCommand(command);

        repository.whenFindThenReturn(role)

        try{
            await handler.handle(command);
        }
        catch(e){
            expect(e).toBeInstanceOf(RoleAlreadyExistsError)
        }
    });

    it('should publish a NewRoleCreatedDomainEvent', async () => {

    });
});