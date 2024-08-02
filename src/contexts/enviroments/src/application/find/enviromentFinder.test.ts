import EnviromentRepositoryMock from "@src/__mock__/enviromentRepositoryMock";
import FindEnviromentQueryHandler from "./findEnviromentQueryHandler";
import EnviromentFinder from "./enviromentFinder";
import FindEnviromentQueryMother from "./findEnviromentQuery.mother";
import EnviromentNotFoundError from "@src/domain/errors/enviromentNotFoundError";
import FindEnviromentResponseMother from "./findEnviroment.mother";
import Uuid from "@context/shared/domain/uuid";

describe('enviromentFinder', () => {
    it('should call the repository with the id', async () => {
        expect.hasAssertions();

        const repository = new EnviromentRepositoryMock(),
            handler = new FindEnviromentQueryHandler(
                new EnviromentFinder(repository)
            ),
            query = FindEnviromentQueryMother.random(),
            enviroment = FindEnviromentQueryMother.randomEnviroment(query);

        repository.whenFindThenReturn(enviroment);

        await handler.handle(query);

        repository.assertFindHasBeenCalledWith(new Uuid(query.id));
    });

    it('should find an enviroment', async () => {
        expect.hasAssertions();

        const repository = new EnviromentRepositoryMock(),
            handler = new FindEnviromentQueryHandler(
                new EnviromentFinder(repository)
            ),
            query = FindEnviromentQueryMother.random(),
            enviroment = FindEnviromentQueryMother.randomEnviroment(query),
            expected = FindEnviromentResponseMother.create(enviroment.toPrimitives());

        repository.whenFindThenReturn(enviroment);

        const response = await handler.handle(query);

        expect(response).toStrictEqual(expected);
    });
    
    it('should throw an EnviromentNotFoundError when the enviroment does not exist', async () => {
        expect.hasAssertions();

        const repository = new EnviromentRepositoryMock(),
            handler = new FindEnviromentQueryHandler(
                new EnviromentFinder(repository)
            ),
            query = FindEnviromentQueryMother.random();

        try {
            repository.whenFindThenReturn(null);

            await handler.handle(query);
        } catch (e) {
            expect(e).toBeInstanceOf(EnviromentNotFoundError);
        }
    });
});
