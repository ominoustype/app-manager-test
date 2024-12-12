import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import UserRepositoryMock from "@src/__mock__/userRepositoryMock";
import DisableUserCommandHandler from "./disableUserCommandHandler";
import UserDisabler from "./userDisabler";
import UserMother from "@src/domain/user.mother";
import DisableUserCommandMother from "./disableUserCommand.mother";

describe('userDisabler', () => {
    it('should call the repository with the username', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new DisableUserCommandHandler(
                new UserDisabler(repository, eventBus)
            ),
            user = UserMother.random(),
            command = DisableUserCommandMother.create({
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
            handler = new DisableUserCommandHandler(
                new UserDisabler(repository, eventBus)
            ),
            user = UserMother.random(),
            command = DisableUserCommandMother.create({
                username: user.username.toString()
            }),
            disabledUser = UserMother.disabled(user.toPrimitives());

        repository.whenFindByUsernameThenReturn(user);

        await handler.handle(command);

        repository.assertUpdateHasBeenCalledWith(disabledUser);
    });
});
