import UserRepositoryMock from "@src/__mock__/userRepositoryMock";
import RemoveUserCommandHandler from "./removeUserCommandHandler";
import UserRemover from "./userRemover";
import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import UserMother from "@src/domain/user.mother";
import RemoveUserCommandMother from "./removeUserCommand.mother";
import UserRemovedDomainEventMother from "@src/domain/domainEvents/userRemovedDomainEvent.mother";

describe('userRemover', () => {
    it('should find the user with the username', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new RemoveUserCommandHandler(
                new UserRemover(repository, eventBus)
            ),
            user = UserMother.random(),
            command = RemoveUserCommandMother.create({
                username: user.username.toString()
            });

        repository.whenFindByUsernameThenReturn(user);

        await handler.handle(command);

        repository.assertFindByUsernameHasBeenCalledWith(user.username);
    });

    it('should remove an user', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new RemoveUserCommandHandler(
                new UserRemover(repository, eventBus)
            ),
            user = UserMother.random(),
            command = RemoveUserCommandMother.create({
                username: user.username.toString()
            });

        repository.whenFindByUsernameThenReturn(user);

        await handler.handle(command);

        repository.assertDeleteHasBeenCalledWith(user);
    });
    
    it('should publish an UserRemovedDomainEvent', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new RemoveUserCommandHandler(
                new UserRemover(repository, eventBus)
            ),
            command = RemoveUserCommandMother.random(),
            user = RemoveUserCommandMother.applyCommand(command);

        
        repository.whenFindByUsernameThenReturn(user);
        
        await handler.handle(command);
        
        eventBus.assertLastPublishedEventIs(
            UserRemovedDomainEventMother.fromUser(user),
            [
                'aggregateId',
            ]
        )
    });
});
