import RoleRepositoryMock from "@src/__mock__/roleRepository";
import RemoveRoleCommandHandler from "./removeRoleCommandHandler";
import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import RoleRemover from "./roleRemover";
import RemoveRoleCommandMother from "./removeRoleCommand.mother";
import RoleRemovedDomainEventMother from "@src/domain/events/roleRemovedDomainEvent.mother";

describe('roleRemover', () => {
    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new RoleRepositoryMock(),
            eventbus = new EventBusMock(),
            handler = new RemoveRoleCommandHandler(
                new RoleRemover(repository, eventbus)
            ),
            command = RemoveRoleCommandMother.random(),
            role = RemoveRoleCommandMother.applyCommand(command);

        repository.whenFindThenReturn(role);

        await handler.handle(command);

        repository.assertDeleteHasBeenCalledWith(role);
    });

    it('should publish a RoleRemovedDomainEvent', async () => {
        expect.hasAssertions();

        const repository = new RoleRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new RemoveRoleCommandHandler(
                new RoleRemover(repository, eventBus)
            ),
            command = RemoveRoleCommandMother.random(),
            role = RemoveRoleCommandMother.applyCommand(command);

        repository.whenFindThenReturn(role);

        await handler.handle(command);

        eventBus.assertLastPublishedEventIs(
            RoleRemovedDomainEventMother.fromRole(
                RemoveRoleCommandMother.applyCommand(command)
            ),
            [
                'aggregateId',
                'body.id'
            ]
        )
    });
});