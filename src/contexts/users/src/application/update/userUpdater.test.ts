import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import UserRepositoryMock from "@src/__mock__/userRepositoryMock";
import UpdateUserCommandHandler from "./updateUserCommandHandler";
import UserUpdater from "./userUpdater";
import UserMother from "@src/domain/user.mother";
import UpdateUserCommandMother from "./updateUserCommand.mother";
import UserUpdatedDomainEventMother from "@src/domain/domainEvents/userUpdatedDomainEvent.mother";
import QueryBusMock from "@context/shared/__mocks__/queryBus.mock";
import CommandBusMock from "@context/shared/__mocks__/commandBus.mock";
import RoleMother from "@context/roles/domain/role.mother";
import CreateRoleResponseMother from "@context/roles/application/create/createRoleResponse.mother";
import UpdateRoleCommand from "@context/roles/application/update/updateRoleCommand";
import FindRoleResponseMother from "@context/roles/application/find/findRoleResponse.mother";

describe('userUpdater', () => {
    it('should call the repository with the username', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            eventBus = new EventBusMock(),
            queryBus = new QueryBusMock(),
            commandBus = new CommandBusMock(),
            handler = new UpdateUserCommandHandler(
                new UserUpdater(repository, eventBus, queryBus, commandBus)
            ),
            command = UpdateUserCommandMother.random(),
            expected = UpdateUserCommandMother.applyCommand(command);

        repository.whenFindByUsernameThenReturn(expected.user);
        
        queryBus.whenAskThenReturn(FindRoleResponseMother.create(expected.role.toPrimitives()));

        await handler.handle(command);

        repository.assertFindByUsernameHasBeenCalledWith(expected.user.username);
    });

    it('should update an user and disptach an UpdateRoleCommand', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            eventBus = new EventBusMock(),
            queryBus = new QueryBusMock(),
            commandBus = new CommandBusMock(),
            handler = new UpdateUserCommandHandler(
                new UserUpdater(repository, eventBus, queryBus, commandBus)
            ),
            command = UpdateUserCommandMother.random(),
            { user: user, role: role } = UpdateUserCommandMother.applyCommand(command),
            oldUser = UserMother.random({
                username: user.username.value
            }),
            oldRole = RoleMother.random({
                id: role.id.value
            }),
            expected = UserMother.merge(oldUser, user);

        repository.whenFindByUsernameThenReturn(oldUser);

        const roleResponse = CreateRoleResponseMother.random(oldRole.toPrimitives());
        queryBus.whenAskThenReturn(
            roleResponse
        );

        await handler.handle(command);

        repository.assertUpdateHasBeenCalledWith(expected);

        commandBus.assertLastDispatchedCommandIs(
            new UpdateRoleCommand(role.toPrimitives())
        );
    });
    
    it('should publish an UserUpdatedDomainEvent', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            eventBus = new EventBusMock(),
            queryBus = new QueryBusMock(),
            commandBus = new CommandBusMock(),
            handler = new UpdateUserCommandHandler(
                new UserUpdater(repository, eventBus, queryBus, commandBus)
            ),
            command = UpdateUserCommandMother.random(),
            { user: user, role: role } = UpdateUserCommandMother.applyCommand(command),
            oldUser = UserMother.random({
                username: user.username.value
            }),
            oldRole = RoleMother.random({
                id: role.id.value
            }),
            expected = UserMother.merge(oldUser, user);

        repository.whenFindByUsernameThenReturn(oldUser);

        const roleResponse = CreateRoleResponseMother.random(oldRole.toPrimitives());
        queryBus.whenAskThenReturn(
            roleResponse
        );
    
        await handler.handle(command);

        eventBus.assertLastPublishedEventIs(
            UserUpdatedDomainEventMother.fromUser(expected),
            [
                'aggregateId',
            ]
        );
    });
});