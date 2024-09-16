import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import RoleRepositoryMock from "@src/__mock__/roleRepository";
import UpdateRoleCommandHandler from "./updateRoleCommandHandler";
import UpdateRoleCommandMother from "./updateRoleCommand.mother";
import RoleMother from "@src/domain/role.mother";
import RoleUpdater from "./roleUpdater";
import RoleUpdatedDomainEventMother from "@src/domain/events/environmentUpdatedDomainEvent.mother";

describe('roleUpdater', () => {
    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new RoleRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new UpdateRoleCommandHandler(
                new RoleUpdater(repository, eventBus)
            ),

            command = UpdateRoleCommandMother.random(),
            role = UpdateRoleCommandMother.applyCommand(command),
            oldRole = RoleMother.random(),
            expected = RoleMother.merge(oldRole, role);

            repository.whenFindThenReturn(oldRole);

            await handler.handle(command);

            repository.assertUpdateHasBeenCalledWith(expected);
    });

    it('should publish an EnvironmentUpdatedDomainEvent', async () => {
        expect.hasAssertions();

        const repository = new RoleRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new UpdateRoleCommandHandler(
                new RoleUpdater(repository, eventBus)
            ),

            command = UpdateRoleCommandMother.random(),
            role = UpdateRoleCommandMother.applyCommand(command),
            oldRole = RoleMother.random(),
            expected = RoleMother.merge(oldRole, role);
        
        repository.whenFindThenReturn(oldRole);

        await handler.handle(command);

        eventBus.assertLastPublishedEventIs(RoleUpdatedDomainEventMother.create(expected.toPrimitives()));
    });
});