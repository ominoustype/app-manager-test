import { Nullable } from "@context/shared/domain/nullable";
import Uuid from "@context/shared/domain/uuid";
import EnviromentId from "@src/domain/enviromentId";
import EnviromentRepository from "@src/domain/enviromentRepository";
import Enviroment from "@src/domain/enviroment";
import { omit } from 'lodash';
import { SearchEnviromentsQueryParams } from "@src/application/search/searchEnviromentsQuery";
import Enviroments from "@src/domain/enviroments";

export default class EnviromentRepositoryMock implements EnviromentRepository {
    private mockFind = jest.fn();
    private mockSearch = jest.fn();
    private mockCreate = jest.fn();
    private mockDelete = jest.fn();
    private mockUpdate = jest.fn();
    
    async whenFindThenReturn(enviroment: Nullable<Enviroment>): Promise<void> {
        this.mockFind.mockReturnValue(Promise.resolve(enviroment));
    }

    async assertFindHasBeenCalledWith(id: Uuid): Promise<void> {
        expect(this.mockFind).toHaveBeenCalledWith(id);
    }

    assertCreateHasBeenCalledWith(enviroment: Enviroment, exclusions: Array<string>) {
        const { mock } = this.mockCreate,
            lastEnviromentCreated = mock.calls[mock.calls.length - 1][0],
            lastEnviromentCreatedPrimitives = omit(
                lastEnviromentCreated.toPrimitives(),
                exclusions ?? []
            ),
            expectedBody = omit(enviroment.toPrimitives(), exclusions ?? []);

        expect(lastEnviromentCreatedPrimitives).toStrictEqual(expectedBody);
    }

    async assertDeleteHasBeenCalledWith(enviroment: Enviroment): Promise<void> {
        expect(this.mockDelete).toHaveBeenCalledWith(enviroment);
    }

    async assertUpdateHasBeenCalledWith(enviroment: Enviroment): Promise<void> {
        expect(this.mockUpdate).toHaveBeenCalledWith(enviroment);
    }

    async whenSearchThenReturn(enviroment: Enviroments): Promise<void> {
        this.mockSearch.mockReturnValue(enviroment);
    }

    async assertSearchHasBeenCalledWith(params: SearchEnviromentsQueryParams): Promise<void> {
        expect(this.mockSearch).toHaveBeenCalledWith(params);
    }

    async find(id: EnviromentId): Promise<Nullable<Enviroment>> {
        return this.mockFind(id);
    }

    async search(params: SearchEnviromentsQueryParams): Promise<Enviroments> {
        return this.mockSearch(params);
    }

    create(enviroment: Enviroment): Promise<void> {
        return this.mockCreate(enviroment);
    }

    delete(enviroment: Enviroment): Promise<void> {
        return this.mockDelete(enviroment);
    }

    update(enviroment: Enviroment): Promise<void> {
        return this.mockUpdate(enviroment);
    }
}