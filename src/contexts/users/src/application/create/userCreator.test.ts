/*
import CreateUserCommandHandler from "./createUserCommandHandler";
import UserCreator from "./userCreator";
import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import CreateUserCommandMother from "./createUserCommand.mother";
import NewUserCreatedDomainEventMother from "@src/domain/domainEvents/newUserCreatedDomainEvent.mother";
import UserAlreadyExistsError from "@src/domain/errors/userAlreadyExistsError";
import UserRepositoryMock from "@src/__mock__/userRepositoryMock";

describe('userCreator', () => {
    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new CreateUserCommandHandler(
                new UserCreator(repository,eventBus)
            ),
            command = CreateUserCommandMother.random();

        repository.whenFindByUsernameThenReturn(null);

        await handler.handle(command);

        repository.assertCreateHasBeenCalledWith(
            CreateUserCommandMother.applyCommand(command),
            ['id', 'createdAt']
        )
    });
    
    it('should throw an UserAlreadyExistsError', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new CreateUserCommandHandler(
                new UserCreator(repository,eventBus)
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
            handler = new CreateUserCommandHandler(
                new UserCreator(repository,eventBus)
            ),
            command = CreateUserCommandMother.random();
        
        repository.whenFindByUsernameThenReturn(null);
        
        await handler.handle(command);
        eventBus.assertLastPublishedEventIs(
            NewUserCreatedDomainEventMother.fromUser(
                CreateUserCommandMother.applyCommand(command)
            ),
            [
                'aggregateId',
                'body.createdAt',
                'body.id'
            ]
        )
    });
});
*/