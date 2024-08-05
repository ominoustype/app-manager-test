import EnvironmentRepositoryMock from "@src/__mock__/environmentRepositoryMock";
import FindEnvironmentQueryHandler from "./findEnvironmentQueryHandler";
import EnvironmentFinder from "./environmentFinder";
import FindEnvironmentQueryMother from "./findEnvironmentQuery.mother";
import EnvironmentNotFoundError from "@src/domain/errors/environmentNotFoundError";
import FindEnvironmentResponseMother from "./findEnvironmentResponse.mother";
import Uuid from "@context/shared/domain/uuid";

describe('environmentFinder', () => {
    it('should call the repository with the id', async () => {
        expect.hasAssertions();

        const repository = new EnvironmentRepositoryMock(),
            handler = new FindEnvironmentQueryHandler(
                new EnvironmentFinder(repository)
            ),
            query = FindEnvironmentQueryMother.random(),
            environment = FindEnvironmentQueryMother.randomEnvironment(query);

        repository.whenFindThenReturn(environment);

        await handler.handle(query);

        repository.assertFindHasBeenCalledWith(new Uuid(query.id));
    });

    it('should find an environment', async () => {
        expect.hasAssertions();

        const repository = new EnvironmentRepositoryMock(),
            handler = new FindEnvironmentQueryHandler(
                new EnvironmentFinder(repository)
            ),
            query = FindEnvironmentQueryMother.random(),
            environment = FindEnvironmentQueryMother.randomEnvironment(query),
            expected = FindEnvironmentResponseMother.create(environment.toPrimitives());

        repository.whenFindThenReturn(environment);

        const response = await handler.handle(query);

        expect(response).toStrictEqual(expected);
    });
    
    it('should throw an EnvironmentNotFoundError when the environment does not exist', async () => {
        expect.hasAssertions();

        const repository = new EnvironmentRepositoryMock(),
            handler = new FindEnvironmentQueryHandler(
                new EnvironmentFinder(repository)
            ),
            query = FindEnvironmentQueryMother.random();

        try {
            repository.whenFindThenReturn(null);

            await handler.handle(query);
        } catch (e) {
            expect(e).toBeInstanceOf(EnvironmentNotFoundError);
        }
    });
});
