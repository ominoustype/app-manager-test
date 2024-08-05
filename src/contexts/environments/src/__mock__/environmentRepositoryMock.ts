import { Nullable } from "@context/shared/domain/nullable";
import Uuid from "@context/shared/domain/uuid";
import EnvironmentId from "@src/domain/environmentId";
import EnvironmentRepository from "@src/domain/environmentRepository";
import Environment from "@src/domain/environment";
import { omit } from 'lodash';
import { SearchEnvironmentsQueryParams } from "@src/application/search/searchEnvironmentsQuery";
import Environments from "@src/domain/environments";

export default class EnvironmentRepositoryMock implements EnvironmentRepository {
    private mockFind = jest.fn();
    private mockSearch = jest.fn();
    private mockCreate = jest.fn();
    private mockDelete = jest.fn();
    private mockUpdate = jest.fn();
    
    async whenFindThenReturn(Environment: Nullable<Environment>): Promise<void> {
        this.mockFind.mockReturnValue(Promise.resolve(Environment));
    }

    async assertFindHasBeenCalledWith(id: Uuid): Promise<void> {
        expect(this.mockFind).toHaveBeenCalledWith(id);
    }

    assertCreateHasBeenCalledWith(Environment: Environment, exclusions: Array<string>) {
        const { mock } = this.mockCreate,
            lastEnvironmentCreated = mock.calls[mock.calls.length - 1][0],
            lastEnvironmentCreatedPrimitives = omit(
                lastEnvironmentCreated.toPrimitives(),
                exclusions ?? []
            ),
            expectedBody = omit(Environment.toPrimitives(), exclusions ?? []);

        expect(lastEnvironmentCreatedPrimitives).toStrictEqual(expectedBody);
    }

    async assertDeleteHasBeenCalledWith(Environment: Environment): Promise<void> {
        expect(this.mockDelete).toHaveBeenCalledWith(Environment);
    }

    async assertUpdateHasBeenCalledWith(Environment: Environment): Promise<void> {
        expect(this.mockUpdate).toHaveBeenCalledWith(Environment);
    }

    async whenSearchThenReturn(Environment: Environments): Promise<void> {
        this.mockSearch.mockReturnValue(Environment);
    }

    async assertSearchHasBeenCalledWith(params: SearchEnvironmentsQueryParams): Promise<void> {
        expect(this.mockSearch).toHaveBeenCalledWith(params);
    }

    async find(id: EnvironmentId): Promise<Nullable<Environment>> {
        return this.mockFind(id);
    }

    async search(params: SearchEnvironmentsQueryParams): Promise<Environments> {
        return this.mockSearch(params);
    }

    create(Environment: Environment): Promise<void> {
        return this.mockCreate(Environment);
    }

    delete(Environment: Environment): Promise<void> {
        return this.mockDelete(Environment);
    }

    update(Environment: Environment): Promise<void> {
        return this.mockUpdate(Environment);
    }
}