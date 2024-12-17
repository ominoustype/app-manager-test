import CreateUserCommandHandler from "./createUserCommandHandler";
import UserCreator from "./userCreator";
import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import CreateUserCommandMother from "./createUserCommand.mother";
import NewUserCreatedDomainEventMother from "@src/domain/domainEvents/newUserCreatedDomainEvent.mother";
import UserAlreadyExistsError from "@src/domain/errors/userAlreadyExistsError";
import UserRepositoryMock from "@src/__mock__/userRepositoryMock";
import QueryBusMock from "@context/shared/__mocks__/queryBus.mock";
import CommandBusMock from "@context/shared/__mocks__/commandBus.mock";
import CreateRoleResponseMother from "@context/roles/application/create/createRoleResponse.mother"
import RoleName from "@src/domain/role/roleName";
import RemoveRoleCommandMother from "@context/roles/application/delete/removeRoleCommand.mother";

describe('userCreator', () => {
    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            eventBus = new EventBusMock(),
            queryBus = new QueryBusMock(),
            commandBus = new CommandBusMock(),
            handler = new CreateUserCommandHandler(
                new UserCreator(repository, eventBus, queryBus, commandBus)
            ),
            command = CreateUserCommandMother.random();

        repository.whenFindByUsernameThenReturn(null);
        
        const role = CreateRoleResponseMother.random(command.data.role);
        queryBus.whenAskThenReturn(
            role
        );

        await handler.handle(command);

        repository.assertCreateHasBeenCalledWith(
            CreateUserCommandMother.applyCommand(CreateUserCommandMother.create({ // Add the role.id to the User
                ...command.data,
                user: {
                    ...command.data.user,
                    role: {
                        id: role.primitives.id,
                        name: role.primitives.name as RoleName
                    }
                }
            }
            )),
            ['id', 'createdAt']
        );
    });
    
    it('should throw an UserAlreadyExistsError', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            eventBus = new EventBusMock(),
            queryBus = new QueryBusMock(),
            commandBus = new CommandBusMock(),
            handler = new CreateUserCommandHandler(
                new UserCreator(repository,eventBus, queryBus, commandBus)
            ),
            command = CreateUserCommandMother.random(),
            user = CreateUserCommandMother.applyCommand(command);

        try{     
            repository.whenFindByUsernameThenReturn(user);

            await handler.handle(command);
        } catch (e) {
            expect(e).toBeInstanceOf(UserAlreadyExistsError);
        }
    });

    it('should publish a NewUserCreatedDomainEvent', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            eventBus = new EventBusMock(),
            queryBus = new QueryBusMock(),
            commandBus = new CommandBusMock(),
            handler = new CreateUserCommandHandler(
                new UserCreator(repository,eventBus, queryBus, commandBus)
            ),
            command = CreateUserCommandMother.random();
        
        repository.whenFindByUsernameThenReturn(null);

        const role = CreateRoleResponseMother.random(command.data.role);
        queryBus.whenAskThenReturn(
            role
        );
        
        await handler.handle(command);
        eventBus.assertLastPublishedEventIs(
            NewUserCreatedDomainEventMother.fromUser(
                CreateUserCommandMother.applyCommand(CreateUserCommandMother.create({
                    ...command.data,
                    user: {
                        ...command.data.user,
                        role: {
                            id: role.primitives.id,
                            name: role.primitives.name as RoleName
                        }
                    }
                }))
            ),
            [
                'aggregateId',
                'body.createdAt',
                'body.id'
            ]
        );
    });

    it('createUser should fail and dispatch a RemoveRoleCommand', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            eventBus = new EventBusMock(),
            queryBus = new QueryBusMock(),
            commandBus = new CommandBusMock(),
            handler = new CreateUserCommandHandler(
                new UserCreator(repository, eventBus, queryBus, commandBus)
            ),
            command = CreateUserCommandMother.random();
        
        repository.whenFindByRoleThenReturn(null);

        /* Force the User.crete() method to fail so the operation is aborted and the Role created beforehand is deleted */
        command.data.user.customer.id = "i n v a l i d";

        repository.whenFindByUsernameThenReturn(null);
        
        const role = CreateRoleResponseMother.random(command.data.role);
        queryBus.whenAskThenReturn(
            role
        );

        try{
            await handler.handle(command);
        }
        catch(e) {
            commandBus.assertLastDispatchedCommandIs(RemoveRoleCommandMother.create(
                {
                    id: role.primitives.id
                }
            ))
        }
    });
});