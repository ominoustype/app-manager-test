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
    
    async whenFindThenReturn(environment: Nullable<Environment>): Promise<void> {
        this.mockFind.mockReturnValue(Promise.resolve(environment));
    }

    async assertFindHasBeenCalledWith(id: Uuid): Promise<void> {
        expect(this.mockFind).toHaveBeenCalledWith(id);
    }

    assertCreateHasBeenCalledWith(environment: Environment, exclusions: Array<string>) {
        const { mock } = this.mockCreate,
            lastEnvironmentCreated = mock.calls[mock.calls.length - 1][0],
            lastEnvironmentCreatedPrimitives = omit(
                lastEnvironmentCreated.toPrimitives(),
                exclusions ?? []
            ),
            expectedBody = omit(environment.toPrimitives(), exclusions ?? []);

        expect(lastEnvironmentCreatedPrimitives).toStrictEqual(expectedBody);
    }

    async assertDeleteHasBeenCalledWith(environment: Environment): Promise<void> {
        expect(this.mockDelete).toHaveBeenCalledWith(environment);
    }

    async assertUpdateHasBeenCalledWith(environment: Environment): Promise<void> {
        const { mock } = this.mockUpdate,
        lastEnvironmentUpdated = mock.calls[mock.calls.length - 1][0] as Environment,
        lastEnvironmentUpdatedPrimitives = {
            ...lastEnvironmentUpdated.toPrimitives(),
            prevDeploys: lastEnvironmentUpdated.toPrimitives().prevDeploys.map(item => omit(item, 'deployedAt'))
        },
        expectedBody = {
            ...environment.toPrimitives(),
            prevDeploys: environment.toPrimitives().prevDeploys.map(item => omit(item, 'deployedAt'))
        }   

        expect(lastEnvironmentUpdatedPrimitives).toStrictEqual(expectedBody);
    }

    async whenSearchThenReturn(environment: Environments): Promise<void> {
        this.mockSearch.mockReturnValue(environment);
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

    create(environment: Environment): Promise<void> {
        return this.mockCreate(environment);
    }

    delete(environment: Environment): Promise<void> {
        return this.mockDelete(environment);
    }

    update(environment: Environment): Promise<void> {
        return this.mockUpdate(environment);
    }
}