import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import UserRepositoryMock from "@src/__mock__/userRepositoryMock";
import UpdateUserCommandHandler from "./updateUserCommandHandler";
import UserUpdater from "./userUpdater";
import UserMother from "@src/domain/user.mother";
import UpdateUserCommandMother from "./updateUserCommand.mother";
import UserUpdatedDomainEventMother from "@src/domain/domainEvents/userUpdatedDomainEvent.mother";

describe('userUpdater', () => {
    it('should call the repository with the username', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new UpdateUserCommandHandler(
                new UserUpdater(repository, eventBus)
            ),
            user = UserMother.random(),
            command = UpdateUserCommandMother.create({
                username: user.username.toString()
            });

        repository.whenFindByUsernameThenReturn(user);

        await handler.handle(command);

        repository.assertFindByUsernameHasBeenCalledWith(user.username);
    });

    it('should update an user', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new UpdateUserCommandHandler(
                new UserUpdater(repository, eventBus)
            ),
            command = UpdateUserCommandMother.random(),
            user = UpdateUserCommandMother.applyCommand(command),
            oldUser = UserMother.random({
                username: user.username.value
            }),
            expected = UserMother.merge(oldUser, user);

        repository.whenFindByUsernameThenReturn(oldUser);

        await handler.handle(command);

        repository.assertUpdateHasBeenCalledWith(expected);
    });
    
    it('should publish an UserUpdatedDomainEvent', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new UpdateUserCommandHandler(
                new UserUpdater(repository, eventBus)
            ),
            command = UpdateUserCommandMother.random(),
            user = UpdateUserCommandMother.applyCommand(command),
            oldUser = UserMother.random({
                username: user.username.value
            }),
            expected = UserMother.merge(oldUser, user);

        repository.whenFindByUsernameThenReturn(oldUser);

        await handler.handle(command);

        eventBus.assertLastPublishedEventIs(
            UserUpdatedDomainEventMother.fromUser(expected),
            [
                'aggregateId',
            ]
        );
    });
});
